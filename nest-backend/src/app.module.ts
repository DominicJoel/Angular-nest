import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Para poder usar las variables de entorno
    MongooseModule.forRoot(process.env.MONGO_URI), // Para poder conectarnos a la base de datos de mongo. tuvimos que instalar(@nestjs/mongoose mongoose) (27017)es el puerto configurado, mongoose es un ORM y para mejor entendimiento es algo como entity framework
    AuthModule,

  ],
  controllers: [
    ]
    ,
  providers: [],
})
export class AppModule {
  // constructor(){
  //   console.log(process.env);// Para probar y ver que las variables de entorno 
    
  // }
}
