import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItems } from "./order-items.entity";

@Entity()
export class Orders {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    buyerName: string;

    @Column()
    orderNo: string;

    @Column()
    totalQty: number;

    @Column()
    totalValue: number;

    @OneToMany(() => OrderItems, (orderItem) => orderItem.order, {
        cascade: ["insert", "update"],
    })
    orderItems!: OrderItems[];
}