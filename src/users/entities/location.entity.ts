import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('man_location')
export class Location {
  @PrimaryColumn()
  location: string;

  @Column()
  status: string;
}
