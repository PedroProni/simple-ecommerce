import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
import { hash, genSalt, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  // Methods for managing users

  async create(createUserDto: CreateUserDto) {
    try {
      const existing_user = await this.userModel.findOne({ email: createUserDto.email }).exec();
      if (existing_user) {
        throw new ConflictException('User already exists');
      }
      if (createUserDto.password?.length < 6) {
        throw new ConflictException('Password must be at least 6 characters long');
      }
      createUserDto.password = await this.hashPassword(createUserDto.password);
      const create_user = new this.userModel(createUserDto);
      const result = await create_user.save();
      const user = new User(result.toJSON());
      const token = await this.jwtService.signAsync({ sub: user._id, email: user.email });
      return { "token": token };
    } catch (e) {
      await this.handleException(e);
    }
  }

  async login(email: string, password: string,) {
    try {
      const user = await this.userExists('email', email);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (!await compare(password, user.password)) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload = { sub: user._id, email: user.email };
      return {
        token: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      await this.handleException(e);
    }
  }

  async findAll() {
    try {
      const users = await this.userModel.find().exec();
      return users.map((user) => {
        const json_user = user.toJSON();
        return instanceToPlain(new User(json_user));
      });
    } catch (e) {
      await this.handleException(e);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userExists('_id', id);
      return instanceToPlain(new User (user.toJSON()));
    } catch (e) {
      await this.handleException(e);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.userExists('_id', id);
      if (updateUserDto.password?.length < 6) {
        throw new ConflictException('Password must be at least 6 characters long');
      }
      if (updateUserDto.password) {
        updateUserDto.password = await this.hashPassword(updateUserDto.password);
      }
      if (updateUserDto.email) {
        const existing_user = await this.userExists('email', updateUserDto.email);
        if (existing_user && existing_user._id.toString() !== id) {
          throw new ConflictException('Email already exists');
        }
      }
      const updated_user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
      return updated_user;
    } catch (e) {
      await this.handleException(e);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userExists('_id', id);
      this.userModel.deleteOne({ _id: id }).exec();
      return user;
    } catch (e) {
      await this.handleException(e);
    }
  }

  // Helper methods for processing and managing product-related logic

  private async hashPassword(password: string) {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  async userExists(key: string, value: string) {
    const user = await this.userModel.findOne({ [key]: value }).exec();
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }


  private async handleException(e: any) {
    if (e.response?.message === 'User not found') {
      throw new NotFoundException('User not found');
    }
    if (e.response?.message === 'Invalid credentials') {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (e.response?.message === 'User already exists') {
      throw new ConflictException('User already exists');
    }
    if (e.response?.message === 'Email already exists') {
      throw new ConflictException('Email already exists');
    }
    if (e.response?.message === 'Password must be at least 6 characters long') {
      throw new ConflictException('Password must be at least 6 characters long');
    }
    if (e.response?.message === 'User not found') {
      throw new UnauthorizedException('User not found');
    }
    throw new InternalServerErrorException();
  }
}


