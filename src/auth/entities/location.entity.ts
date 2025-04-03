import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('man_location')
export class LocationEntity {
  @PrimaryGeneratedColumn({ name: 'id_location' })
  idLocation: number;

  @Column()
  location: string;

  @Column()
  user: string;

  @Column({ type: 'varchar' })
  status: string;
}
