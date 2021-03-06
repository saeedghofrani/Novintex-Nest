import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Task } from '../task/task.entity';

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


    @OneToMany((type) => Task, (task) => task.user, { onDelete: 'CASCADE' })
    tasks: Task[];


    constructor(partial: Partial<UserNoin>) {
        Object.assign(this, partial);
    }
}