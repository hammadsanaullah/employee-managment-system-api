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
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { TransformInterceptor } from '../../shared/common/transform.interceptor';
import { JwtAuthGuard } from '../../shared/guards/jwt.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ToggleCheckInCheckOutDto } from './dto/toggle-checkin-checkout.dto';
import { PaginationDto } from '../../shared/common/pagination.dto';

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

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 10 })
  find(@Query() pagination: PaginationDto) {
    return this.userService.findAll(pagination);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOneById(@Param('id') id: number) {
    return this.userService.findOneById(id);
  }

  @Get('/by-role/:role')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findByRole(@Param('role') role: string) {
    return this.userService.find(role);
  }

  @Get('/by-barcode/:barCode')
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
