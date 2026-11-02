terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Fetch the Default VPC
data "aws_vpc" "default" {
  default = true
}

# Security Group for CodeExec
resource "aws_security_group" "codeexec_sg" {
  name        = "codeexec-security-group"
  description = "Allow public HTTP and optional CIDR-restricted SSH"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "HTTP web traffic"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  dynamic "ingress" {
    for_each = var.allowed_ssh_cidr == null ? [] : [var.allowed_ssh_cidr]
    content {
      description = "SSH access from the configured CIDR"
      from_port   = 22
      to_port     = 22
      protocol    = "tcp"
      cidr_blocks = [ingress.value]
    }
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "codeexec-security-group"
  }
}

# Use Systems Manager for administration without opening SSH to the internet.
resource "aws_iam_role" "codeexec_instance" {
  name = "codeexec-instance-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "codeexec_ssm" {
  role       = aws_iam_role.codeexec_instance.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "codeexec" {
  name = "codeexec-instance-profile"
  role = aws_iam_role.codeexec_instance.name
}

# Query the latest official Ubuntu 24.04 LTS AMI for the target region
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# EC2 Instance
resource "aws_instance" "codeexec_server" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  key_name               = var.key_name
  iam_instance_profile   = aws_iam_instance_profile.codeexec.name
  vpc_security_group_ids = [aws_security_group.codeexec_sg.id]

  root_block_device {
    volume_size           = 30
    volume_type           = "gp3"
    delete_on_termination = true
  }

  # Bootstrap Docker, Docker Compose, SSM, Git, and swap for builds on small instances.
  user_data = <<-EOF
              #!/usr/bin/env bash
              set -e

              # 1. Setup 4GB swap space to reduce build failures on small instances (t3.micro has 1 GiB RAM).
              fallocate -l 4G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=4096
              chmod 600 /swapfile
              mkswap /swapfile
              swapon /swapfile
              echo '/swapfile none swap sw 0 0' >> /etc/fstab
              sysctl vm.swappiness=60

              # 2. Update system and install prerequisites
              apt-get update -y
              apt-get install -y ca-certificates curl gnupg git snapd

              # 3. Install official Docker and Docker Compose Plugin
              install -m 0755 -d /etc/apt/keyrings
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
              chmod a+r /etc/apt/keyrings/docker.gpg

              echo \
                "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
                "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
                tee /etc/apt/sources.list.d/docker.list > /dev/null

              apt-get update -y
              apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

              # 4. Enable Docker service and give ubuntu user permission
              systemctl enable docker
              systemctl start docker
              usermod -aG docker ubuntu

              # 5. Enable Systems Manager access (IAM role is attached to this instance).
              if ! snap list amazon-ssm-agent >/dev/null 2>&1; then
                snap install amazon-ssm-agent --classic
              fi
              systemctl enable snap.amazon-ssm-agent.amazon-ssm-agent.service
              systemctl start snap.amazon-ssm-agent.amazon-ssm-agent.service

              echo "CodeExec host provisioning complete" > /var/log/codeexec-init.log
              EOF

  tags = {
    Name = "codeexec-server"
  }
}

# Elastic IP to preserve IP address across reboots
resource "aws_eip" "codeexec_eip" {
  instance = aws_instance.codeexec_server.id
  domain   = "vpc"

  tags = {
    Name = "codeexec-eip"
  }
}
