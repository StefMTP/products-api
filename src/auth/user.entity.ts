import { Product } from "src/products/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(_type => Product, product => product.user, {eager: true})
    products: Product[]
}