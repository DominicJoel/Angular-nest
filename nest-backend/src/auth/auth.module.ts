import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    ConfigModule.forRoot(),//To have access to env variable
    MongooseModule.forFeature([ // Para exponer el schema y usarlo a nivel de modulo
      {
        name: User.name,
        schema: UserSchema
      }
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED, //Tenemos que cuidar esta variable de lo contrario cualquiera que la tenga podrá acceder a nuestro token
      signOptions: { expiresIn: '6h' },
    }),
  ]
})
export class AuthModule {}
