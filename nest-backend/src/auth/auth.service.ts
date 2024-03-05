import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';

import * as bcryptjs from 'bcryptjs';

import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { LoginDto,RegisterUserDto, CreateUserDto,UpdateAuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt.payload';
import { LoginResponse } from './interfaces/login-response';


@Injectable()
export class AuthService {

  constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) {}


  async create(_createUserDto: CreateUserDto): Promise<User> {

    try {
      const { password, ...userData } = _createUserDto; // Destructuramos la variable el password y todo lo demas lo pone en un objeto que se llamará userData
         //-1 Encriptar password
      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userData
      });
     
       await newUser.save();
       const { password:_, ...user } = newUser.toJSON(); // (password:_) se hizo esto para renombrarlo porque en la linea 21 ya tenemos una variable called password

       return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`${_createUserDto.email} already exist`)
      }
      throw new InternalServerErrorException('Something wrong happen')
    }


    // 2- Save USer

    // 3- Generate JWT
  }

  async register(registerUserDto: RegisterUserDto): Promise<LoginResponse>{
     const user = await this.create(registerUserDto);

     return {
       user: user,
       token: this.getJwtToken({ id: user._id })
     }
  }

  async login(loginDto: LoginDto): Promise<LoginResponse>{
    const {email, password} = loginDto;
    
    const user = await this.userModel.findOne({email})
    if(!user){
      throw new UnauthorizedException('Not valid credentials - email');
    }

    if(!bcryptjs.compareSync(password, user.password)){
      throw new UnauthorizedException('Not valid credentials - password');
    }

    const {password:_, ...rest} = user.toJSON();

    return {
      user: rest,
      token: this.getJwtToken({id: user.id})
    }
  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findUserById(id: string){
   const user = await this.userModel.findById(id);
   const { password, ...rest } = user; // Para quitar el password del objeto
   return rest;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJwtToken(payload: JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }
}



// nota: 

//Un JWT consta del header, payload y firma
// Header: Dice como fue construido y que tipo de token es
// payload: La info que necesitamos
// Firma: Cnsta del header encriptado, el payload encriptado y una llave secreta que es la que confirma que se encripto como queriamos