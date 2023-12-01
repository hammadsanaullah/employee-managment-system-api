import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../shared/guards/jwt.guard';
import { CheckoutDto } from './dto/checkout.dto';

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

  @Post('/checkout/:barCode')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  markAttendance(@Param("barCode") barCode: string, @Body() checkoutDto: CheckoutDto) {
    return this.attendanceService.checkOut(barCode, checkoutDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.attendanceService.findAll();
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
