/** Validated login input. */
import { IsEmail, IsString, Length } from 'class-validator';
export class LoginDto {
  /** Registered email. */ @IsEmail() email!: string;
  /** Account password. */ @IsString() @Length(1, 128) password!: string;
}
