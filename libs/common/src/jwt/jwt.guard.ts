import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(protected readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = await this.jwtService.getToken(request);
    const validate = await this.jwtService.validate(
      token,
      process.env.JWT_SECRET,
    );
    if (validate) return true;
    return false;
  }
}
