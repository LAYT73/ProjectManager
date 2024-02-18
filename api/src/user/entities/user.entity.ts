import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username:string;

    @Column({nullable: true})
    phone:string;

    @Column()
    email:string;

    @Column({nullable: true})
    password:string;

    @Column({nullable: true})
    refresh_token:string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}