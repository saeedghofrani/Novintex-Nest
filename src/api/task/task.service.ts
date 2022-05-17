import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserNoin } from 'src/api/user/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './task.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async getAllTasks(user: UserNoin): Promise<Task[]> {
    return await this.taskRepository.find({
      relations: ['user'],
      where: { user },
    });
  }

  async getOneTask(
    user: UserNoin,
    id: number | null,
    title: string | undefined = undefined,
  ): Promise<Task> {
    if (title) return await this.taskRepository.findOne({ title, user });
    else if (id) return await this.taskRepository.findOne({ id, user });
    return null;
  }

  async addTask(data: CreateTaskDto, user: UserNoin): Promise<Task> {
    const newTask: Task = await this.taskRepository.create({
      title: data.title,
      description: data.description,
      isCompleted: data.isCompleted,
      user: user,
    });
    await this.taskRepository.save(newTask);
    return newTask;
  }

  async removeTask(task: Task): Promise<void> {
    await this.taskRepository.delete(task);
  }

  async changeIsCompleted(task: Task, isCompleted: boolean): Promise<Task> {
    task.isCompleted = isCompleted;
    await this.taskRepository.save(task);
    return task;
  }
}
