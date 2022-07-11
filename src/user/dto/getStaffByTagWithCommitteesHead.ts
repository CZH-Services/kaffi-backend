import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { IsMultiLingual } from 'src/validations/MultiLanguageValidations';

class GetStaffWithCommitteesHead {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  staffId: number;

  @ApiProperty({ example: 'admin@hotmail.com', required: true })
  @IsEmail({ message: 'Email should be a valid email' })
  email: string;

  @ApiProperty({ example: 'zeinab', required: true })
  @IsString({ message: 'first name should be a string' })
  firstName: string;

  @ApiProperty({ example: 'zeitoun', required: true })
  @IsString({ message: 'last name should be a string' })
  lastName: string;

  @ApiProperty({ example: '123456', required: true })
  @ValidateIf((o) => !o.authWithGoogle || o.password)
  @IsString({ message: 'Password should be a string' })
  password: string;

  @ApiProperty({ example: false, required: true })
  @IsBoolean({ message: 'authWithGoogle should be a boolean' })
  authWithGoogle: boolean;

  @ApiProperty({ example: 'USA', required: true })
  @IsOptional()
  @IsString({ message: 'location should be a string' })
  location: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
    name: 'profile',
  })
  @IsOptional()
  profile: object;

  @ApiProperty({ example: 'Member', required: true })
  @IsString({ message: 'tag should be a string' })
  tag: string;

  @ApiProperty({ example: '1', required: true })
  @IsNumber()
  rank: number;

  @ApiProperty({
    example: { en: 'President', de: 'Präsidentin' },
    required: true,
  })
  @IsMultiLingual()
  title: object;

  @ApiProperty({
    example: [{ commitee: 'Finance' }],
    required: true,
  })
  committeeHeads: { committee: string }[];
}

export class GetStaffByTagWithCommitteesHead {
  @ApiProperty({ type: [GetStaffWithCommitteesHead] })
  @ValidateNested()
  readonly board: GetStaffWithCommitteesHead[];

  @ApiProperty({ type: [GetStaffWithCommitteesHead] })
  @ValidateNested()
  member: GetStaffByTagWithCommitteesHead[];
}
