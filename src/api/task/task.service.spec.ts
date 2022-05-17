import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTaskDto } from './task.dto';
import { UserNoin } from 'src/api/user/user.entity';

describe('TaskService', () => {
  let taskService: TaskService;
  let taskRepoitory: Repository<Task>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            save: jest.fn(),
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskRepoitory = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should add new task.', async () => {
    const data: CreateTaskDto = {
      title: 'test',
      description: 'testtest',
      isCompleted: undefined,
    };
    const user: UserNoin = {
      id: 1,
      name: 'test',
      password: 'test',
      email: 'test@test.com',
      tasks: [],
      createdAt: new Date(2022-0o5-17),
      updatedAt: new Date(2022-0o5-18)
    };
    interface ResolveValue {
      title: string;
      description: string;
      isCompleted: boolean;
      user: UserNoin;
    }
    const resolveValue: ResolveValue = { ...data, user };

    const createSpy = jest
      .spyOn(taskRepoitory, 'create')
      .mockImplementation(function (data: ResolveValue): Task {
        const task: Task = {
          ...data,
          isCompleted: Boolean(resolveValue.isCompleted),
          id: 1,
        };
        return task;
      });

    const saveSpy = jest
      .spyOn(taskRepoitory, 'save')
      .mockImplementation(() => undefined);

    const result = await taskService.addTask(data, user);
    expect(createSpy).toBeCalledTimes(1);
    expect(saveSpy).toBeCalledTimes(1);
    expect(createSpy).toBeCalledWith(resolveValue);
    expect(result).toMatchObject({
      ...resolveValue,
      isCompleted: Boolean(resolveValue.isCompleted),
      id: 1,
    });
    expect(saveSpy).toBeCalledWith({
      ...resolveValue,
      isCompleted: Boolean(resolveValue.isCompleted),
      id: 1,
    });
  });
});
