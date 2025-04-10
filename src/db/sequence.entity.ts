import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sequences {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    serialNo: number;
}