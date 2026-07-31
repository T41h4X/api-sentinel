/** Validated registration input; transport-level rules are kept outside the domain service. */
import { IsEmail, IsOptional, IsString, Length, MaxLength } from 'class-validator';
export class RegisterDto {
  /** Email used as the unique login identifier. */ @IsEmail() email!: string;
  /** Plaintext password, hashed before persistence. */ @IsString()
  @Length(12, 128)
  password!: string;
  /** Optional display name. */ @IsOptional() @IsString() @MaxLength(80) firstName?: string;
  /** Optional family name. */ @IsOptional() @IsString() @MaxLength(80) lastName?: string;
}
