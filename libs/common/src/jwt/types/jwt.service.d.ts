import { Request } from 'express';
import { JwtConfigInterface, UserPayloadInterface } from './types';
export declare class JwtService {
  constructor(nestJwtService: NestJwtService);
  async generateToken<T extends UserPayloadInterface>(payload: T, config: JwtConfigInterface): Promise<string>;
  async getToken(request: Request): Promise<string>;
  async validate(token: string, secret: string): Promise<UserPayloadInterface>;
}
