/** Validated refresh request that keeps token transport explicit. */
import { IsString, Length } from 'class-validator';
export class RefreshTokenDto {
  /** Opaque refresh JWT issued by login or registration. */ @IsString()
  @Length(1)
  refreshToken!: string;
}
