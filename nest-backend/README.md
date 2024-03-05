# Backend Nest

````
docker compose up -d
````

copiar el ```.env.template``` y renombrarlo a ```.env```


///*---- Nota --// 
//-- Podemos usar mongo compass para visualiazar la conexion a la DB de mongo https://www.mongodb.com/try/download/compass --//

//Ademas usamos docker para no tener que instalar todo de manera local eso lo configuramos en el file called dockerCompose
// Lo que está en volumes es donde guardara la data local , porque queremos que sea persistente
// (ports) los puertos por donde se podrá entrar o salir 
// (docker compose up -d ) esto ayuda a levantar la imagen que está configurada en el dockerCompose


// Sugerencia , llevarme del shorcut de nest de Fernando Herrera
// Eje: nest start --watch crea un recurso completo



// Para poder usar las variables de entorno: npm i @nestjs/config


// class-validator class-transformer -- libererias externas para manejar las restricciones del api

// npm i bcryptjs -- Para la encriptación de las password