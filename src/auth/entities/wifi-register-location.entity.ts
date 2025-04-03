import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('man_wifi_register_location')
export class WifiRegisterLocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  location: string;

  @Column({ name: 'id_register' })
  idRegister: number;
}
