// src/devices/entities/node.entity.ts
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Location } from './location.entity';

@Entity('node')
export class Node {
  @PrimaryColumn({ name: 'macaddr_lan' })
  macaddrLan: string;

  @Column()
  user: string;

  @Column()
  location: string;

  @Column()
  device_brand: string;

  @Column()
  status: string;

  @ManyToOne(() => Location)
  @JoinColumn({ name: 'location', referencedColumnName: 'location' })
  locationEntity: Location;
}
