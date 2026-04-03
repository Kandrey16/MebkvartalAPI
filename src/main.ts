import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function start() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  const origins = [process.env.MAIL_URL, process.env.CLIENT_URL];

  app.enableCors({
    origin: origins,
    credentials: true,
  });

  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}
start().catch((error) => {
  console.error(error);
  process.exit(1);
});
