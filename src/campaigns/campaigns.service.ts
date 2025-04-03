import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from './entities/campaign.entity';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  async getCampaignsByUser(user: string) {
    return this.campaignRepository.find({
      where: { user, type: 'WIFI', typeWifi: 'REGISTER', status: '0' },
      order: { id: 'DESC' },
    });
  }
}
