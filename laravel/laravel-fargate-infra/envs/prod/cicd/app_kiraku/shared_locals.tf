locals {
  name_prefix = "${local.system_name}-${local.env_name}"
  system_name = "ecs"
  env_name    = "prod"
}
