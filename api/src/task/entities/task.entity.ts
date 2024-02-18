import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    projectId: number;

    @Column()
    name: string;

    @Column({nullable: true})
    order: number;

    @Column({default: false})
    checked: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}