variable "vpc_cidr" {
  description = "CIDR block for VPC"
  default     = "10.1.0.0/16"
}

variable "public_subnet1_cidr" {
  description = "CIDR block for public subnet 1"
  default     = "10.1.0.0/24"
}

variable "public_subnet2_cidr" {
  description = "CIDR block for public subnet 2"
  default     = "10.1.1.0/24"
}

variable "private_subnet1_cidr" {
  description = "CIDR block for private subnet 1"
  default     = "10.1.2.0/24"
}

variable "private_subnet2_cidr" {
  description = "CIDR block for private subnet 2"
  default     = "10.1.3.0/24"
}

resource "aws_vpc" "vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = {
    Name = "ecs-lesson-vpc"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.vpc.id
  tags = {
    Name = "ecs-lesson-vpc-igw"
  }
}

resource "aws_vpn_gateway_attachment" "gateway_attachment" {
  vpc_id              = aws_vpc.vpc.id
  internet_gateway_id = aws_internet_gateway.igw.id
}

resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.vpc.id
  tags = {
    Name = "ecs-lesson-public-route-table"
  }
}

resource "aws_route" "public_route" {
  route_table_id         = aws_route_table.public_route_table.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.igw.id
}

resource "aws_subnet" "public_subnet1" {
  vpc_id                  = aws_vpc.vpc.id
  availability_zone       = data.aws_availability_zones.available.names[0]
  cidr_block              = var.public_subnet1_cidr
  map_public_ip_on_launch = true
  tags = {
    Name = "Public Subnet 1"
  }
}

resource "aws_subnet" "public_subnet2" {
  vpc_id                  = aws_vpc.vpc.id
  availability_zone       = data.aws_availability_zones.available.names[1]
  cidr_block              = var.public_subnet2_cidr
  map_public_ip_on_launch = true
  tags = {
    Name = "Public Subnet 2"
  }
}

resource "aws_subnet" "private_subnet1" {
  vpc_id                  = aws_vpc.vpc.id
  availability_zone       = data.aws_availability_zones.available.names[0]
  cidr_block              = var.private_subnet1_cidr
  map_public_ip_on_launch = false
  tags = {
    Name = "Private Subnet 1"
  }
}

resource "aws_subnet" "private_subnet2" {
  vpc_id                  = aws_vpc.vpc.id
  availability_zone       = data.aws_availability_zones.available.names[1]
  cidr_block              = var.private_subnet2_cidr
  map_public_ip_on_launch = false
  tags = {
    Name = "Private Subnet 2"
  }
}

data "aws_availability_zones" "available" {}

output "vpc_id" {
  value = aws_vpc.vpc.id
}

output "public_subnet1_id" {
  value = aws_subnet.public_subnet1.id
}

output "public_subnet2_id" {
  value = aws_subnet.public_subnet2.id
}

output "private_subnet1_id" {
  value = aws_subnet.private_subnet1.id
}

output "private_subnet2_id" {
  value = aws_subnet.private_subnet2.id
}
