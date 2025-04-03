import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('man_person')
export class PersonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  macaddr: string;

  @Column()
  user: string;

  @Column({ name: 'registered_in' })
  registeredIn: string;
}
