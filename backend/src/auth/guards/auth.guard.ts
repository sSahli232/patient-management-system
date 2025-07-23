/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { extractToken } from '../utils/extract-token';
import { IAuthenticate } from '../services/authenticate.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authenticate: IAuthenticate,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const auth = request.headers.authorization;

    if (!auth?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing bearer token');
    }

    const token = extractToken(auth);

    if (!token) {
      return false;
    }

    try {
      const user = await this.authenticate.authenticate(token);

      request['user'] = user;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired JWT');
    }
  }
}
