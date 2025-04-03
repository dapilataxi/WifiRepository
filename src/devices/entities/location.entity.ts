import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Node } from './node.entity';

@Entity('man_location')
export class Location {
  @PrimaryColumn()
  location: string; // clave primaria

  @Column()
  user: string;

  @Column()
  status: string;

  @OneToMany(() => Node, (node) => node.locationEntity)
  nodes: Node[];
}
