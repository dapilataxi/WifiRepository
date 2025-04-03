import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wifi_captive_portal')
export class WifiCaptivePortal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_analytics' })
  userAnalytics: string;

  @Column({ name: 'device_mac' })
  deviceMac: string;

  @Column({ type: 'datetime' })
  datetime: Date;

  @Column({ name: 'attempt_error' })
  attemptError: number;

  @Column({ name: 'attempt_error_description', nullable: true })
  attemptErrorDescription: string;
}
