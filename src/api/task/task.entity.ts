import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserNoin } from '../user/user.entity';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: false })
    isCompleted: boolean;

    @ManyToOne((type) => UserNoin, (user) => user.id)
    user: UserNoin;

    constructor(partial: Partial<Task>) {
        Object.assign(this, partial);
    }
}