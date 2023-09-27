import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Hooman } from "./Hooman"

@Entity()
export class Cat {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    age: number

    @ManyToOne(()=> Hooman, (hooman) => hooman.cats)
    master: Hooman;

}
