import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ProjectStatus {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    projectId: number;

    @Column({nullable: true})
    status: number;

    @Column({nullable: true})
    startDate: Date;

    @Column({nullable: true})
    endDate: Date;

    @Column({nullable: true})
    priority: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}