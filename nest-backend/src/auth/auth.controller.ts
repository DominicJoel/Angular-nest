import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginDto,CreateUserDto,UpdateAuthDto, RegisterUserDto } from './dto'; //Aqui por el index ts podemos hacer esto
import { AuthGuard } from './guards/auth.guard';
import { User } from './entities/user.entity';
import { LoginResponse } from './interfaces/login-response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto);
  }

  @Post('/register')
  register(@Body() registerUserDto: RegisterUserDto){
    return this.authService.register(registerUserDto);
  }

  @UseGuards(AuthGuard) // uN DECORADOR PARA INDICAR EL GUARD EN EL REQUEST
  @Get()
  findAll(@Request() req: Request) {
    const user = req['user']; //Esto viene porque en el guard cuando el token pasa agrega el user 
    return this.authService.findAll();
  }
  
  @UseGuards(AuthGuard) // uN DECORADOR PARA INDICAR EL GUARD EN EL REQUEST
  @Get('check-token')
  checkToken(@Request() req: Request): LoginResponse{
    const user = req['user'] as User; //Esto viene porque en el guard cuando el token pasa agrega el user 

    return {
      user,
      token: this.authService.getJwtToken({ id: user._id })
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
