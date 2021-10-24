import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { TransformInterceptor } from "./transform.interceptor";

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("Products API")
    .setDescription(
      "API for CRUD operations on products and a JWT authentication & authorization system for users that act as merchants, with products belonging to their imaginary shops. In order to make authorized requests, first hit the register/login route with credentials in order to be issued a temporary access token. Then, press the green 'Authorize' button below to save your token and gain access to all protected routes."
    )
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  const port = 3000;
  await app.listen(port);
  logger.log(`Listening on port ${port}`);
}
bootstrap();
