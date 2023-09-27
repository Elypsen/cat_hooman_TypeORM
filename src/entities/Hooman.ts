import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cat } from "./Cat";

@Entity()
export class Hooman {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @OneToMany(() => Cat, (cat) => cat.master)
    cats: Cat[];

}