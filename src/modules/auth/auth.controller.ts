import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegistrationDto } from '../../common/dtos/registration.dto';
import { ApiEndpoint } from '../../common/decorators/api-endpoint.decorator';
import { AuthDocumentation } from '../../common/documentation/modules/auth';

@ApiTags('Auth')
@Controller({
  path: '/auth',
  version: '1',
})
export class AuthController {
  constructor (private authService: AuthService) {}

  @ApiEndpoint({
    summary: 'User account registration',
    documentation: AuthDocumentation.SIGN_UP,
  })
  @Post('/signUp')
  async signUp (@Body() body: RegistrationDto) {
    return this.authService.signUp(body);
  }
}
