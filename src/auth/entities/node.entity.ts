import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('node')
export class NodeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'macaddr_lan' })
  macaddrLan: string;

  @Column()
  user: string;

  @Column()
  location: string;

  @Column({ name: 'device_brand', nullable: true })
  deviceBrand: string;

  @Column({ type: 'varchar' })
  status: string;
}
