import {
  Controller,
  Get,
  Post,
  Req,
  Query,
  Body,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidateDeviceDto } from './dto/validate-device.dto';
import { Response, Request } from 'express';

@Controller('wifianalytics')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('auth')
  async authenticateDevice(
    @Query() query: ValidateDeviceDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const result = await this.authService.handleAuth(query, req);
      if (result.redirect) {
        return res.redirect(result.redirectUrl);
      }
      return res.status(200).json(result);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
