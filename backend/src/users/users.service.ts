import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const userData = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      dateOfBirth: createUserDto.dateOfBirth,
    };

    return this.prisma.user.create({
      data: userData,
    });
  }
  findAll() {
    return this.prisma.user.findMany();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return updatedUser;
  }

  async remove(id: number) {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
      return { message: `User with id ${id} deleted successfully` };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Could not delete user with id ${id}: ${error.message}`);
      }
    }
  }
}
