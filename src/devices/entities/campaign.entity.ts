import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('man_campaign')
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'campaign_name' })
  title: string;

  @Column()
  HTML: string;

  @Column()
  type: string;

  @Column({ name: 'type_wifi' })
  typeWifi: string;

  @Column()
  user: string;

  @Column()
  status: string;
}
