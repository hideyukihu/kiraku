resource "aws_ecr_repository" "nginx" {
  name = "ecs-prod-kiraku-nginx"

  tags = {
    Name = "ecs-prod-kiraku-nginx"
  }
}
