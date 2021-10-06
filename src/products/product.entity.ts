import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { productStatus } from "./product-status.enum";

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    title: string;

    @Column()
    description: string;

    @Column()
    handle: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({ nullable: true })
    product_type: string;

    @Column({
        type: 'enum',
        enum: productStatus,
        default: productStatus.DRAFT
    })
    status: productStatus;

    @Column({ nullable: true })
    tags: string;
}