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
  description = "Allow inbound SSH (22), HTTP (80), HTTPS (443), and direct backend (8080)"
  vpc_id      = data.aws_vpc.default.id

  # SSH
  ingress {
    description = "SSH access"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.allowed_ssh_cidr]
  }

  # HTTP
  ingress {
    description = "HTTP web traffic"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS
  ingress {
    description = "HTTPS web traffic"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Spring Boot Backend direct access (optional/debugging)
  ingress {
    description = "Spring Boot backend API direct access"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Outbound access (required for apt, docker pull, maven dependencies)
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
  vpc_security_group_ids = [aws_security_group.codeexec_sg.id]

  root_block_device {
    volume_size           = 30
    volume_type           = "gp3"
    delete_on_termination = true
  }

  # Bootstrap Docker, Docker Compose, Git, and a 4GB swapfile for compilation on t3.micro
  user_data = <<-EOF
              #!/usr/bin/env bash
              set -e

              # 1. Setup 4GB swap space to ensure builds never run out of memory on t3.micro (1GB RAM)
              fallocate -l 4G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=4096
              chmod 600 /swapfile
              mkswap /swapfile
              swapon /swapfile
              echo '/swapfile none swap sw 0 0' >> /etc/fstab
              sysctl vm.swappiness=60

              # 2. Update system and install prerequisites
              apt-get update -y
              apt-get install -y ca-certificates curl gnupg git

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
