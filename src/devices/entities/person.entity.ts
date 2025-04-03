import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('man_person')
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'macaddr' })
  mac: string;

  @Column()
  user: string;

  @Column({ name: 'registered_in' })
  registeredIn: string;
}
