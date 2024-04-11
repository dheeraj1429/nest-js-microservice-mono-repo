import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtService {
  constructor(protected readonly nestJwtService: NestJwtService) {}

  async generateToken<T extends object>(
    payload: T,
    secret: string,
    expiresIn: number,
  ): Promise<string> {
    return this.nestJwtService.sign(payload, { secret, expiresIn });
  }

  async getToken(request: Request): Promise<string> {
    const authorization = request.headers['authorization'];
    if (!authorization) throw new UnauthorizedException();
    const token = authorization.split(' ');
    if (token.length !== 2)
      throw new UnauthorizedException('Please provide valid token.');
    return token[1];
  }

  async validate(token: string, secret: string) {
    try {
      const validateToken = await this.nestJwtService.verify(token, { secret });
      if (!validateToken) throw new ForbiddenException('Token expire');
      return true;
    } catch (err) {
      throw new ForbiddenException('Invalid token');
    }
  }
}
