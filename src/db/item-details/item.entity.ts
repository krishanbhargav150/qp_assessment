import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productErpId: string;

    @Column()
    productName: string;

    @Column()
    MRP: number;

    @Column()
    price: number;
}