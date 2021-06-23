import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import { User } from "../entities/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    createUser(user: User): Promise<User> {
        return this.save(user);
    }

    updateUser(user: User, changes: UpdateUserDto): Promise<User> {
        this.merge(user, changes);
        return this.save(user);
    }

    findByEmail(email: string): Promise<User> {
        return this.findOne({ where: { email } });
    }

}