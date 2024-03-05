// https://docs.nestjs.com/
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({ //Bloquear la info si no llega como el request del controller lo espera
       whitelist: true,
       forbidNonWhitelisted: true,
    })
    );
  await app.listen(3000);
}
bootstrap();


///*---- Nota --// 
//-- Podemos usar mongo compass para visualiazar la conexion a la DB de mongo https://www.mongodb.com/try/download/compass --//

//Ademas usamos docker para no tener que instalar todo de manera local eso lo configuramos en el file called dockerCompose
// Lo que está en volumes es donde guardara la data local , porque queremos que sea persistente
// (ports) los puertos por donde se podrá entrar o salir 
// (docker compose up -d ) esto ayuda a levantar la imagen que está configurada en el dockerCompose


// Sugerencia , llevarme del shorcut de nest de Fernando Herrera
// Eje: nest start --watch crea un recurso completo