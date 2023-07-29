import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Note } from '@prisma/client';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) { }

  // Add Note to user
  async createNote(data: Prisma.NoteCreateInput) {
    return await this.prisma.note.create({ data });
  }

  async getNoteById(where: Prisma.NoteWhereUniqueInput) {
    return await this.prisma.note.findUnique({ where });
  }

  // Get all notes of the the target user
  async getAllNotesByAuthorId(
    authorId: number,
  ): Promise<{ notes: Note[]; count: number }> {
    const notes = await this.prisma.note.findMany({
      where: { authorId },
      include: { author: false },
      orderBy: { createdAt: 'desc' },
    });
    const count = await this.prisma.note.count({ where: { authorId } });
    return { notes, count };
  }

  // update the note of the user by id
  async updateNoteById(params: {
    where: Prisma.NoteWhereUniqueInput;
    data: Prisma.NoteUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.note.update({
      where: where,
      data: data,
      include: { author: false },
    });
  }

  // delete note by the user id
  async deleteNoteById(where: Prisma.NoteWhereUniqueInput) {
    return this.prisma.note.delete({ where });
  }

}
