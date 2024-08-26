import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix("api")
  app.enableCors({
    origin: '*', // Barcha domendan keladigan so'rovlarni ruxsat berish
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Ruxsat berilgan HTTP usullari
    allowedHeaders: 'Content-Type, Accept, Authorization', // Ruxsat berilgan headers
    credentials: true, // Agar brauzerdan cookielarni yuborish kerak bo'lsa
  });

  const port = process.env.PORT || 4000
  await app.listen(port, () => {
    console.log("Server is working on port ", port)
  });
}
bootstrap();
