import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SignInAdminDto } from './dto/sign-in-admin.dto';
import { CreateEmployeeDto } from './dto/create-new-employee';
import { JwtAuthGuard } from '../../shared/guards/jwt.guard';
import { UpdateEmployeeDto } from './dto/update-employee';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(FileInterceptor('picture'))
  @ApiConsumes('multipart/form-data')
  createNewEmployee(
    @UploadedFile() picture: Express.Multer.File,
    @Body() createEmployeeDto: CreateEmployeeDto,
  ) {
    createEmployeeDto.picture = picture;
    return this.adminService.createEmployee(createEmployeeDto);
  }

  @Patch('update-employee/:employeeId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('picture'))
  @ApiConsumes('multipart/form-data')
  updateEmployee(
    @Param('employeeId') employeeId: number,
    @UploadedFile() picture: Express.Multer.File,
    @Body() createEmployeeDto: CreateEmployeeDto,
  ) {
    createEmployeeDto.picture = picture;
    return this.adminService.updateEmployee(employeeId, createEmployeeDto);
  }

  @Delete('employee/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

  // @Post('update-employee')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // updateEmployee(@Body() updateEmployeeDto: UpdateEmployeeDto) {
  //   return this.adminService.updateEmployee(updateEmployeeDto);
  // }
}
