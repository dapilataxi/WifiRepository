import { Controller, Get, Query } from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller('wifianalytics')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get('validation')
  async validateLocation(
    @Query('user') user: string,
    @Query('location') location: string,
  ) {
    const data = await this.locationsService.getLocationData(user, location);

    if (!data || data.length === 0) {
      return { error: 'No se encontraron parámetros para la ubicación' };
    }

    return data[0]; // Devuelve solo el primer resultado
  }
}
