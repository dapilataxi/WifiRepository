import { IsOptional, IsString } from 'class-validator';

export class WifiRequestDto {
  @IsOptional()
  @IsString()
  mac_device?: string;

  @IsOptional()
  @IsString()
  ap_mac?: string;

  @IsOptional()
  @IsString()
  apmac?: string;

  // Puedes agregar más si deseas detectar tipo de dispositivo desde aquí
}
