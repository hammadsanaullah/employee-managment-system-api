import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignInAdminDto } from './dto/sign-in-admin.dto';
import { CreateEmployeeDto } from './dto/create-new-employee';
import { JwtAuthGuard } from '../../shared/guards/jwt.guard';
import { UpdateEmployeeDto } from './dto/update-employee';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create-new-admin')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInAdminDto) {
    return this.adminService.signIn(signInDto);
  }

  @Post('create-new-employee')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createNewEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.adminService.createEmployee(createEmployeeDto);
  }

  // @Post('update-employee')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // updateEmployee(@Body() updateEmployeeDto: UpdateEmployeeDto) {
  //   return this.adminService.updateEmployee(updateEmployeeDto);
  // }
}
