import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Task } from '../task/task.entity';
import { Role } from './enums/role.enum';

@Entity()
export class UserNoin {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'varchar', length: 120 })
    public name: string;

    @Column({ type: 'varchar', length: 120 })
    public email: string;

    @Exclude({ toPlainOnly: true })
    @Column({ type: 'varchar', length: 120 })
    password: string;

    /*
     * Create and Update Date Columns
     */

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt!: Date;


    @OneToMany((type) => Task, (task) => task.user)
    tasks: Task[];


    @Column({
        type: 'enum',
        enum: Role,
        default: Role.regular,
    })
    roles: Role[];

    constructor(partial: Partial<UserNoin>) {
        Object.assign(this, partial);
    }
}

// import { Task } from '../task/task.entity';
// import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';



//   @OneToMany((type) => Task, (task) => task.user)
//   tasks: Task[];


// }