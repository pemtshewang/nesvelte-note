import { Note } from "@prisma/client";
import { IsBoolean, IsBooleanString, IsString, IsStrongPassword } from "class-validator";
import { Prisma } from '@prisma/client';

interface UserInterface extends Prisma.UserCreateInput {
}

export class UserDTO implements UserInterface {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsBoolean()
  paid: boolean;

  notes?: Prisma.NoteCreateNestedManyWithoutAuthorInput;

}
