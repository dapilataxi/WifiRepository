import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Node } from 'src/devices/entities/node.entity';

@Entity('man_location')
export class Location {
  @PrimaryColumn()
  location: string;

  @Column()
  user: string;

  @Column()
  status: string;

  // Relación con Node
  @OneToMany(() => Node, (node) => node.locationEntity)
  nodes: Node[];
}
