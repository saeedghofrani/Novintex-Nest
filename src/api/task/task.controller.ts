import {
    Body,
    ClassSerializerInterceptor,
    ConflictException,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserNoin } from 'src/api/user/user.entity';
import { ChangeIsCompletedTaskDto, CreateTaskDto } from './task.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';


@ApiTags('Task')
@ApiBearerAuth('access-token')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Get()
    async getAllUserTasks(@Req() req: Request): Promise<Task[]> {
        const user: UserNoin = req.res.locals.user;
        return await this.taskService.getAllTasks(user);
    }

    @Get(':id')
    async getUserTaskById(
        @Req() req: Request,
        @Param('id') id: number,
    ): Promise<Task> {
        const user: UserNoin = req.res.locals.user;
        const task: Task = await this.taskService.getOneTask(user, id);
        if (!task) throw new NotFoundException('Task not found');
        return task;
    }

    @Patch()
    async changeIsCompleted(
        @Req() req: Request,
        @Body() body: ChangeIsCompletedTaskDto,
    ): Promise<Task> {
        const user: UserNoin = req.res.locals.user;
        const task: Task = await this.taskService.getOneTask(user, body.id);
        if (!task) throw new NotFoundException('Task not found');
        const updatedTask = await this.taskService.changeIsCompleted(
            task,
            body.isCompleted,
        );
        return updatedTask;
    }

    @Post()
    async addNewTask(
        @Req() req: Request,
        @Body() body: CreateTaskDto,
    ): Promise<Task> {
        const user: UserNoin = req.res.locals.user;
        const duplicatedTask = await this.taskService.getOneTask(
            user,
            null,
            body.title,
        );
        if (duplicatedTask) throw new ConflictException('Task already exist.');
        return await this.taskService.addTask(body, user);
    }

    @Delete(':id')
    async removeTask(
        @Req() req: Request,
        @Param('id') id: number,
    ): Promise<void> {
        const user: UserNoin = req.res.locals.user;
        const task: Task = await this.taskService.getOneTask(user, id);
        if (!task) throw new NotFoundException('Task not found');
        await this.taskService.removeTask(task);
    }
}
