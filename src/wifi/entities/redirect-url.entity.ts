import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('node_location')
export class RedirectUrl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  location: string;

  @Column({ name: 'redirect_url' })
  redirectUrl: string;
}
