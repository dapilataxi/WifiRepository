import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('man_wifi_social_options')
export class WifiSocialOptionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ name: 'facebook_login' })
  facebookLogin: string;

  @Column({ name: 'formulario_login' })
  formularioLogin: string;

  @Column({ name: 'staff_login' })
  staffLogin: number;
}
