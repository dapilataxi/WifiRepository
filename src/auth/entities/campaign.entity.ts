import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('man_campaign')
export class CampaignEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: string;

  @Column({ name: 'campaign_name' })
  campaignName: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  html: string;

  @Column()
  type: string;

  @Column({ name: 'type_wifi' })
  typeWifi: string;

  @Column()
  status: string;
}
