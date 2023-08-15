import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from '@prisma/client';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) { }

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get(':groupId/subjectsAndTeachers')
  async getGroupSubjectsAndTeachers(@Param('groupId') groupId: string) {
    return this.groupService.getGroupSubjectsAndTeachers(+groupId);
  }

   

  @Get(':groupId/Students')
  async getGroupStudents(@Param('groupId') groupId: string) {
    return this.groupService.getGroupStudents(+groupId);
  }


  @Get('teacher/:id')
  teacherSubjects(@Param('id') id: string) {
    return this.groupService.getTeacherSubjectsAndGroups(+id);
  }

  @Get('/by-career/:careerId')
  async getGroupsByCareer(@Param('careerId') careerId: string): Promise<Group[]> {
    return this.groupService.getAllGroupsByCareer(+careerId);
  }


  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
