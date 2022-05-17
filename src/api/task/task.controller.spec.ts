import { Repository } from 'typeorm';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import * as httpMocks from 'node-mocks-http';
import { UserNoin } from 'src/api/user/user.entity';

describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: TaskService;
  let taskRepoitory: Repository<Task>;

  beforeEach(() => {
    taskService = new TaskService(taskRepoitory);
    taskController = new TaskController(taskService);
  });

  it('should return an array of tasks from getAllUserTasks()', async () => {
    const req = httpMocks.createRequest();
    req.res = httpMocks.createResponse();
    const result: Task[] = [
      { title: 'test', id: 1 } as Task,
      { title: 'test2', id: 2 } as Task,
    ];
    const user: UserNoin = {
      id: 1,
      name: 'test',
      password: 'test',
      email: 'test@test.com',
      tasks: result,
      createdAt: new Date(2022-0o5-17),
      updatedAt: new Date(2022-0o5-18)
    };
    req.res.locals.user = user;

    // // mock
    // taskService.getAllTasks = jest
    //   .fn()
    //   .mockImplementation((): Task[] => result);

    // spy
    const getAllUserTasksSpy = jest
      .spyOn(taskService, 'getAllTasks')
      .mockImplementation(async (): Promise<Task[]> => result);

    expect(await taskController.getAllUserTasks(req)).toEqual(result);
    expect(getAllUserTasksSpy).toBeCalledTimes(1);
    expect(getAllUserTasksSpy).toBeCalledWith(user);
  });
});
