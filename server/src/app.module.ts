import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { enviroments } from './enviroments';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import config from './config';
import { envSchema } from './schemas';

@Module({
  imports: [
    ProductModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [config],
      validationSchema: envSchema
    })
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
