output "public_ip" {
  description = "The public Elastic IP of the CodeExec EC2 instance"
  value       = aws_eip.codeexec_eip.public_ip
}

output "instance_id" {
  description = "The EC2 instance ID, for Systems Manager sessions"
  value       = aws_instance.codeexec_server.id
}

output "website_url" {
  description = "The URL to access the CodeExec visualizer in browser"
  value       = "http://${aws_eip.codeexec_eip.public_ip}"
}

output "api_endpoint" {
  description = "The execute endpoint routed through the frontend reverse proxy"
  value       = "http://${aws_eip.codeexec_eip.public_ip}/api/execute"
}

output "ssh_command" {
  description = "SSH command, available only when a key pair and SSH CIDR are configured"
  value = (
    var.key_name != null && var.allowed_ssh_cidr != null
    ? "ssh -i /path/to/${var.key_name}.pem ubuntu@${aws_eip.codeexec_eip.public_ip}"
    : null
  )
}
