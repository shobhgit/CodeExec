variable "aws_region" {
  description = "AWS region for provisioning resources"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type. t3.micro has 2 vCPUs and 1 GiB RAM; use a larger type for builds or concurrent runs."
  type        = string
  default     = "t3.micro"
}

variable "key_name" {
  description = "Optional existing EC2 Key Pair name for SSH access; prefer Systems Manager Session Manager."
  type        = string
  default     = null
}

variable "allowed_ssh_cidr" {
  description = "Optional IPv4 CIDR permitted to SSH into EC2. Leave null to keep SSH closed and use Systems Manager."
  type        = string
  default     = null

  validation {
    condition     = var.allowed_ssh_cidr == null || can(cidrnetmask(var.allowed_ssh_cidr))
    error_message = "allowed_ssh_cidr must be null or a valid IPv4 CIDR block."
  }
}
