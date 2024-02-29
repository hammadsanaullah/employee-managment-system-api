import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../shared/guards/jwt.guard';
import { CheckoutDto } from './dto/checkout.dto';
import { PaginationDto } from '../../shared/common/pagination.dto';

@ApiTags('attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('/start-shift')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Patch('/checkout/:barCode')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  markAttendance(
    @Param('barCode') barCode: string,
    @Body() checkoutDto: CheckoutDto,
  ) {
    return this.attendanceService.checkOut(barCode, checkoutDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 10 })
  findAll(@Query() pagination: PaginationDto) {
    return this.attendanceService.findAll(pagination);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.attendanceService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto) {
  //   return this.attendanceService.update(+id, updateAttendanceDto);
  // }

  // @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // remove(@Param('id') id: string) {
  //   return this.attendanceService.remove(+id);
  // }
}
