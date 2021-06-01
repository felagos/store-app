import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { CustomersService } from './services/customers/customers.service';
import { UsersController } from './controllers/user/user.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { ProductModule } from '../product/product.module';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [UsersService, CustomersService],
  controllers: [UsersController, CustomerController],
  imports: [
    ProductModule,
    TypeOrmModule.forFeature([UserRepository])
  ]
})
export class UserModule {}
