import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./order.entity";

@Entity()
export class OrderItems {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productErpId: string;

    @Column()
    MRP: number;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Orders, (order) => order.orderItems, {
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
        orphanedRowAction: "delete",
    })
    @JoinColumn({ name: "orderId", referencedColumnName: "id" })
    order!: Orders;
}