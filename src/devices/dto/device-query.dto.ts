// src/devices/dto/device-query.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class DeviceQueryDto {
  @IsOptional()
  @IsString()
  mac?: string;

  @IsOptional()
  @IsString()
  mac_device?: string;

  @IsOptional()
  @IsString()
  ap_mac?: string;

  @IsOptional()
  @IsString()
  apmac?: string;

  @IsOptional()
  @IsString()
  client_mac?: string;

  @IsOptional()
  @IsString()
  continue_url?: string;

  @IsOptional()
  @IsString()
  login_url?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  t?: string; // Unifi

  @IsOptional()
  @IsString()
  'link-login-only'?: string;

  @IsOptional()
  @IsString()
  'link-orig'?: string;

  @IsOptional()
  @IsString()
  uamip?: string;

  @IsOptional()
  @IsString()
  uamport?: string;

  @IsOptional()
  @IsString()
  usermac?: string; // Fortinet

  @IsOptional()
  @IsString()
  post?: string; // Fortinet

  @IsOptional()
  @IsString()
  magic?: string;

  @IsOptional()
  @IsString()
  auto_redirect_url?: string;
}
