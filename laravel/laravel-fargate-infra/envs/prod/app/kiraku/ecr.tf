resource "aws_ecr_repository" "nginx" {
  name = "ecs-prod-kiraku-nginx"

  tags = {
    Name = "ecs-prod-kiraku-nginx"
  }
}

resource "aws_ecr_lifecycle_policy" "nginx" {
  policy = jsonencode(
    {
      "rules" : [
        {
          "rulePriority" : 1,
          "description" : "Holdonly10images,expireallothers",
          "selection" : { "tagStatus" : "any", "countType" : "imageCountMoreThan", "countNumber" : 10 },
          "action" : { "type" : "expire"
      } }]
    }
  )
  repository = aws_ecr_repository.nginx.name
}

module "nginx" {
  source = "../../../../modules/ecr"
  name   = "${local.name_prefix}-${local.service_name}-nginx"
}

module "php" {
    source = "../../../../modules/ecr"

    name = "${local.name_prefix}-${local.service_name}-php"
}




