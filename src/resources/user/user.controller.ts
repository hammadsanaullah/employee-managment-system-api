import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  Request
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { TransformInterceptor } from '../../shared/common/transform.interceptor';
import { JwtAuthGuard } from '../../shared/guards/jwt.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ToggleCheckInCheckOutDto } from './dto/toggle-checkin-checkout.dto';

@ApiTags('user')
@Controller('user')
@UseInterceptors(TransformInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.userService.signIn(signInDto);
  }

  @Patch('/toggle-checkin-or-checkout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  toggleCheckInOrCheckOut(@Body() toggleDto: ToggleCheckInCheckOutDto) {
    return this.userService.toggleCheckInOrCheckOut(toggleDto);
  }

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // findOne() {
  //   return this.userService.findOne();
  // }

  // @Patch('update-profile')
  // update(@Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
