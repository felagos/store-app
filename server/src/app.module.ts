import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ProductModule, CategoryModule, UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
