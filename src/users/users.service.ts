import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { hash, genSalt, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  private async hashPassword(password: string) {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await this.hashPassword(createUserDto.password);
      const createUser = new this.userModel(createUserDto);
      const result = await createUser.save();
      const user = new User(result.toJSON());
      const token = await this.jwtService.signAsync({ sub: user._id, email: user.email });
      return { "token": token };
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw new UnauthorizedException();
    }
  }

  async login(email: string, password: string,): Promise<{ token: string }> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!await compare(password, user.password)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, email: user.email };
    return {
      token: await this.jwtService.signAsync(payload),
    };
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
