import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import { User } from "../entities/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    createUser(userDto: CreateUserDto): Promise<User> {
        const newUser = this.create(userDto);
        return this.save(newUser);
    }

    updateUser(user: User, changes: UpdateUserDto): Promise<User> {
        this.merge(user, changes);
        return this.save(user);
    }

}