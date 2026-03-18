import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../decopators/public.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from '../decopators/role.decorator';
import { JwtPayload } from '../entity/auth.entity';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Публичные — пропускаем
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    // 2. Достаем req (HTTP или GraphQL)
    const type = context.getType<string>();
    const req =
      type === 'http'
        ? context.switchToHttp().getRequest()
        : GqlExecutionContext.create(context).getContext().req;
    const authHeader: string | undefined = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization header missing or invalid',
      );
    }
    const token = authHeader.split(' ')[1];
    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      req.user = payload;
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }
    // 3. Проверка ролей (если указаны)
    const requiredRoles =
      this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? [];
    if (requiredRoles.length === 0) {
      return true;
    }
    const userRole = payload.role;
    if (!userRole || !requiredRoles.includes(userRole)) {
      throw new ForbiddenException('Insufficient role');
    }
    return true;
  }
}
