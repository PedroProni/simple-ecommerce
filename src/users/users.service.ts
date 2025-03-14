import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { hash, genSalt } from 'bcrypt';
import { plainToInstance } from 'class-transformer';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  private async hashPassword(password: string) {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hashPassword(createUserDto.password);
    const createUser = new this.userModel(createUserDto);
    const result = await createUser.save();
    return new User(result.toJSON());
  }

  async findAll() {
    return plainToInstance(User, await this.userModel.find().exec(), { excludeExtraneousValues: true });
  }

  findOne(id: string) {
    return plainToInstance(User, this.userModel.findById(id).exec(), { excludeExtraneousValues: true });	
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ _id: id }, updateUserDto).exec();
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }
}
