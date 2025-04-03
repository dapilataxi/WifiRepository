import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('man_campaign')
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: string;

  @Column({ name: 'campaign_name' })
  campaignName: string;

  @Column()
  type: string;

  @Column({ name: 'type_wifi' })
  typeWifi: string;

  @Column()
  status: string;

  @Column()
  HTML: string;
}
