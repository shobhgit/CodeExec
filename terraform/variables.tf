variable "aws_region" {
  description = "AWS region for provisioning resources"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type. t3.micro (2 vCPU, 4GB RAM) is recommended for Docker builds and compilation."
  type        = string
  default     = "t3.micro"
}

variable "key_name" {
  description = "The name of your existing EC2 Key Pair (created in AWS EC2 Console) for SSH access"
  type        = string
}

variable "allowed_ssh_cidr" {
  description = "CIDR block permitted to SSH into EC2. Default is 0.0.0.0/0, but you can restrict it to your IP"
  type        = string
  default     = "0.0.0.0/0"
}
