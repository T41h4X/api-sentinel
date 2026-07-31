/** Authentication HTTP boundary. It validates input and delegates all security decisions to AuthService. */
import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CurrentUser, JwtPrincipal } from './decorators/current-user.decorator';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  /** Creates a user and session. @param dto registration input @returns JWT access and refresh tokens */
  @Post('register') @ApiOperation({ summary: 'Register an account' }) register(
    @Body() dto: RegisterDto,
  ) {
    return this.auth.register(dto);
  }
  /** Authenticates a user. @param dto login input @returns JWT access and refresh tokens */
  @Post('login') @HttpCode(HttpStatus.OK) @ApiOperation({ summary: 'Log in' }) login(
    @Body() dto: LoginDto,
  ) {
    return this.auth.login(dto);
  }
  /** Rotates a refresh session. @param dto refresh token input @returns a new JWT pair */
  @Post('refresh') @HttpCode(HttpStatus.OK) @ApiOperation({ summary: 'Refresh a session' }) refresh(
    @Body() dto: RefreshTokenDto,
  ) {
    return this.auth.refresh(dto.refreshToken);
  }
  /** Gets the authenticated user. @param principal validated access-token principal @returns public identity profile */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user' })
  me(@CurrentUser() principal: JwtPrincipal) {
    return this.auth.getCurrentUser(principal.sub);
  }
}
