import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt.payload';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private authService:AuthService
  ){

  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>// boolean | Promise<boolean> | Observable<boolean>
   {
   
    const request = context.switchToHttp().getRequest();// Capturamos el request que cruza por el guard
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('There is no bearer token');
    }
  try {
    const payload = await this.jwtService.verifyAsync<JwtPayload>(
      token,
      {
        secret: process.env.JWT_SEED // Esta es la firma que valida que el token es correcto, si es generado con una firma diferente no funcionará
      }
    );

      const user = await this.authService.findUserById(payload.id);
      if(!user) throw new UnauthorizedException('User does not exist');
      if(!user.isActive) throw new UnauthorizedException('User is not active');

      // 💡 We're assigning the payload to the request object heres
      // so that we can access it in our route handlers
      request['user'] = user;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
