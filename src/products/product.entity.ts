import { User } from "src/auth/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
    createdAt: Date;

    @Column({ nullable: true })
    productType: string;

    @Column({
        type: 'enum',
        enum: productStatus,
        default: productStatus.DRAFT
    })
    status: productStatus;

    @Column({ nullable: true })
    tags: string;

    @ManyToOne(_type => User, user => user.products, {eager: false})
    user: User
}