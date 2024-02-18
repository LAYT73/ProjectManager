import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Folder {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    ownerId: number;

    @Column()
    name: string;

    @Column({ default: "me" })
    visibility: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}