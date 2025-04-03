import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('node')
export class Node {
  @PrimaryColumn({ name: 'macaddr_lan' })
  macAddress: string;

  @Column({ name: 'user' })
  userAnalytics: string;

  @Column()
  location: string;

  @Column({ name: 'device_brand' })
  deviceBrand: string;

  @Column({ name: 'status' })
  nodeStatus: string;
}
