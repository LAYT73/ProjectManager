import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    owner_id: number;

    @Column()
    title: string;

    @Column({nullable: true})
    folderId: number;

    @Column({ default: "me" })
    visibility: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}