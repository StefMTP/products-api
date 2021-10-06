import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
      Object.assign(await getConnectionOptions(), {
        autoLoadEntities: true
      }),
    }),
    ConfigModule.forRoot({isGlobal: true})
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
}
