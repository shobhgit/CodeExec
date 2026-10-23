output "public_ip" {
  description = "The public Elastic IP of the CodeExec EC2 instance"
  value       = aws_eip.codeexec_eip.public_ip
}

output "website_url" {
  description = "The URL to access the CodeExec visualizer in browser"
  value       = "http://${aws_eip.codeexec_eip.public_ip}"
}

output "api_endpoint" {
  description = "The backend execute endpoint"
  value       = "http://${aws_eip.codeexec_eip.public_ip}/api/execute"
}

output "ssh_command" {
  description = "Command to SSH into the instance"
  value       = "ssh -i /path/to/${var.key_name}.pem ubuntu@${aws_eip.codeexec_eip.public_ip}"
}
