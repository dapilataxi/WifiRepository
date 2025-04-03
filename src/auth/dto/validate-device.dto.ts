import { IsOptional, IsString } from 'class-validator';

export class ValidateDeviceDto {
  @IsOptional()
  @IsString()
  mac_device?: string;

  @IsOptional()
  @IsString()
  ap_mac?: string;

  @IsOptional()
  @IsString()
  apmac?: string;

  // otros parámetros como POST para mikrotik, meraki, etc.
  @IsOptional()
  @IsString()
  mac?: string;

  @IsOptional()
  @IsString()
  ip?: string;

  @IsOptional()
  @IsString()
  'link-login-only'?: string;

  @IsOptional()
  @IsString()
  'link-orig'?: string;

  @IsOptional()
  @IsString()
  post?: string;

  @IsOptional()
  @IsString()
  magic?: string;

  // etc...
}
