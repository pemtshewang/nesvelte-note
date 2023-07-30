import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { Prisma } from '@prisma/client';

interface UserInterface extends Prisma.UserCreateInput {
}

export class UserDTO implements UserInterface {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsBoolean()
  paid: boolean;

  notes?: Prisma.NoteCreateNestedManyWithoutAuthorInput;

}
