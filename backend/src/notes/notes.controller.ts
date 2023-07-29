import { Body, Controller, Param, Post, Delete, Get } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { NoteCreateDTO } from 'src/dto/note.dto';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) { }

  @ApiTags()
  @Post(":userId/create-note")
  async createNote(@Param("userId") userId: number, @Body() data: NoteCreateDTO) {
    return await this.notesService.createNote(data);
  }

  @Post(":userId/update-note/:noteId")
  async updateNote(@Param("userId") userId: number, @Param("noteId") noteId: number, @Body() data: Prisma.NoteUpdateInput) {
    return await this.notesService.updateNoteById({
      where: { id: noteId },
      data: data
    });
  }

  @Delete(":userId/delete-note/:noteId")
  async deleteNoteById(@Param("userId") userId: number, @Param("noteId") noteId: number) {
    return await this.notesService.deleteNoteById({ id: noteId });
  }

  @Get(":userId/get-notes")
  async getNotes(@Param("userId") userId: number) {
    return await this.notesService.getAllNotesByAuthorId(userId)
  }

  @Get(":userId/get-note/:noteId")
  async getNoteById(@Param("userId") userId: number, @Param("noteId") noteId: number) {
    return await this.notesService.getNoteById({ id: noteId });
  }
}
