import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtConfigInterface, UserPayloadInterface, JwtService as JwtDeclareService } from './types';

@Injectable()
export class JwtService implements JwtDeclareService {
  constructor(protected readonly nestJwtService: NestJwtService) {}

  async generateToken<T extends UserPayloadInterface>(payload: T, config: JwtConfigInterface): Promise<string> {
    return this.nestJwtService.sign(payload, {
      secret: config.secret,
      expiresIn: config.expiresIn,
    });
  }

  async getToken(request: Request): Promise<string> {
    const authorization = request.headers['authorization'];
    if (!authorization) throw new UnauthorizedException();
    const token = authorization.split(' ');
    if (token.length !== 2) throw new UnauthorizedException('Please provide valid token.');
    return token[1];
  }

  async validate(token: string, secret: string): Promise<UserPayloadInterface> {
    try {
      const tokenPayload = await this.nestJwtService.verify<UserPayloadInterface>(token, {
        secret,
      });
      if (!tokenPayload) throw new ForbiddenException('Token expire');
      return tokenPayload;
    } catch (err) {
      throw new ForbiddenException('Invalid token');
    }
  }
}
