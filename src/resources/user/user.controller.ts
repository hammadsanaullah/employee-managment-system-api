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
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
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

  // @Post('/sign-in')
  // signIn(@Body() signInDto: SignInDto) {
  //   return this.userService.signIn(signInDto);
  // }

  // @Patch('/toggle-checkin-or-checkout')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // toggleCheckInOrCheckOut(@Body() toggleDto: ToggleCheckInCheckOutDto) {
  //   return this.userService.toggleCheckInOrCheckOut(toggleDto);
  // }

  @Get('/by-role/:role')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  find(@Param('role') role: string) {
    return this.userService.find(role);
  }

  @Get('/:barCode')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('barCode') barCode: string) {
    return this.userService.findOne(barCode);
  }

  // @Patch('update-profile')
  // update(@Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
