terraform {
  backend "s3" {
    bucket = "kirakubacket"
    key    = "example/prod/cicd/app_foobar_v1.0.0.tfstate"
    region = "ap-northeast-1"
  }
}
