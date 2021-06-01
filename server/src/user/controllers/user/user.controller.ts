import { Controller, Get, Post, Put, Param, ParseIntPipe, Delete, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from '../../dto/user.dto';
import { UsersService } from '../../services/users/users.service';

@ApiTags('user')
@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get(':id/orders')
    getOrder(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getOrderByUser(id);
    }

    @Post()
    create(@Body() payload: CreateUserDto) {
        return this.usersService.create(payload);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateUserDto) {
        return this.usersService.update(id, payload);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(id);
    }
}