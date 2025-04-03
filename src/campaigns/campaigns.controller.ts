import { Controller, Get, Query } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';

@Controller('wifianalytics')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Get('campaign')
  async getCampaigns(@Query('user') user: string) {
    return this.campaignsService.getCampaignsByUser(user);
  }
}
