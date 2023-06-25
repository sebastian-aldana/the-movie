import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'User name' })
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Email address of the user to be created' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Password of the user to be created' })
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
