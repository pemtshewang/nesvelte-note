import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';


type UserReturn = {
  name: string;
  paid: boolean;
}

@Injectable()
export class UsersService {
  constructor(public prisma: PrismaService) { }

  async makePassword(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(10);
    const hash: string = await bcrypt.hash(password, salt);
    return hash;
  }

  async createUser(user: Prisma.UserCreateInput): Promise<User> {
    user.password = await this.makePassword(user.password);
    return await this.prisma.user.create({ data: user });
  }

  async getAllUsers() {
    const data: UserReturn[] = await this.prisma.user.findMany({
      select: { name: true, paid: true }
    });
    return data;
  }

  // get  all users that have name like the name passed in the query
  // solve the problem argument _ref is missing
  async getUsersByName(name: string) {
    return await this.prisma.user.findMany({
      where: {
        name: {
          contains: name
        },
      },
      select: { name: true, paid: true }
    });
  }

  async getUserById(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.prisma.user.findUniqueOrThrow({ where });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return await this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUserById(where: Prisma.UserWhereUniqueInput) {
    return await this.prisma.user.delete({ where });
  }

  async deleteAllUsers() {
    return await this.prisma.user.deleteMany();
  }
}
