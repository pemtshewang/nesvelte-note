import { IsString, IsInt, IsDate, IsDateString, IsOptional } from 'class-validator';
import { Prisma } from '@prisma/client';

export class NoteDTO {

  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsInt()
  readonly authorId: number;
}

// notes dto

interface noteCreateInterface extends Prisma.NoteCreateInput {
}

export class NoteCreateDTO implements noteCreateInterface {
  @IsString()
  title: string;

  @IsString()
  content?: string;

  @IsDateString()
  @IsOptional()
  createdAt?: string | Date;

  @IsOptional()
  @IsDateString()
  updatedAt?: string | Date;

  author: Prisma.UserCreateNestedOneWithoutNotesInput;
}

