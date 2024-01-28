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
  InternalServerErrorException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SignInAdminDto } from './dto/sign-in-admin.dto';
import { CreateEmployeeDto } from './dto/create-new-employee';
import { JwtAuthGuard } from '../../shared/guards/jwt.guard';
import { UpdateEmployeeDto } from './dto/update-employee';
import { FileInterceptor } from '@nestjs/platform-express';
import * as xlsx from 'xlsx';
import { CreateMultipleEmployeesDto } from './dto/create-multiple-employee';
import { Company } from 'src/utils/constants';
import { UploadFileDto } from './dto/upload-file.dto';
import { format } from 'date-fns';
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
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('picture'))
  @ApiConsumes('multipart/form-data')
  createNewEmployee(
    @UploadedFile() picture: Express.Multer.File,
    @Body() createEmployeeDto: CreateEmployeeDto,
  ) {
    createEmployeeDto.picture = picture;
    return this.adminService.createEmployee(createEmployeeDto);
  }

  @Post('create-multiple-employees')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async createMultipleEmployees(
    @UploadedFile() file: Express.Multer.File,
    @Body() UploadFileDto: UploadFileDto,
  ) {
    try {
      UploadFileDto.file = file;

      const workbook = xlsx.read(file.buffer, { type: 'buffer' });
      // const sheetName = workbook.SheetNames[0];
      // const excelData = xlsx.utils.sheet_to_json(
      //   workbook.Sheets['Sayed Mudassar List 23-25'],
      // );

      const data = await Promise.all(
        workbook.SheetNames.map(async (sheetName) => {
          // Extract data from the current sheet
          const sheetData = xlsx.utils.sheet_to_json(
            workbook.Sheets[sheetName],
          );

          // Process excelData and create employees in bulk
          const results = await Promise.all(
            sheetData.map(async (row) => {
              if (row['Employee ID.']) {
                function excelSerialNumberToDate(serialNumber: number): Date {
                  if (!serialNumber) {
                    return null;
                  }
                  // Excel serial numbers start from January 1, 1900
                  const excelStartDate = new Date('1900-01-01');

                  // Calculate the number of milliseconds since the start date
                  const millisecondsOffset =
                    (serialNumber - 1) * 24 * 60 * 60 * 1000;

                  // Create a new Date object by adding the offset to the start date
                  const date = new Date(
                    excelStartDate.getTime() + millisecondsOffset,
                  );

                  // Format the date to the desired format
                  const formattedDate = format(
                    date,
                    "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
                  );

                  return date;
                }

                const createEmployeeDto: CreateMultipleEmployeesDto = {
                  noOfLeaves: 2,
                  barCode: row['Employee ID.'].toUpperCase(),
                  employeeCode: row['Employee ID.'],
                  dateJoining: excelSerialNumberToDate(row['Date of Joining']),
                  firstName: row['First Name'],
                  role: row['Role'],
                  lastName: row['Last Name'],
                  dateBirth: excelSerialNumberToDate(row['Date of Birth']),
                  passportNumber: row['Passport No.'],
                  passportExpiry: excelSerialNumberToDate(
                    row['Passport Issue Date'],
                  ),
                  passportIssue: excelSerialNumberToDate(
                    row['Passport Expiry Date'],
                  ),
                  newPassportNumber: row['Renewed Passport No.'] ?? null,
                  newPassportIssue: excelSerialNumberToDate(
                    row['Renewed Passport Issue Date'],
                  ),
                  newPassportExpiry: excelSerialNumberToDate(
                    row['Renewed Passport Expiry Date'],
                  ),
                  nationality: row['Nationality'],
                  workPermit: row['Work Permit No.'],
                  workPermitPersonal: row['Work Permit Personal No.'],
                  workPermitIssue: excelSerialNumberToDate(
                    row['Work Permit Issue Date'],
                  ),
                  workPermitExpiry: excelSerialNumberToDate(
                    row['Work Permit Expiry Date'],
                  ),
                  newWorkPermit: row['Renewed Workpermit No.'],
                  newWorkPermitIssue: excelSerialNumberToDate(
                    row['Renewed W.P Issue Date'],
                  ),
                  newWorkPermitExpiry: excelSerialNumberToDate(
                    row['Renewed W.P Expiry Date'],
                  ),
                  emirateId: row['EMIRATES ID NO.'],
                  visaNumber: row['Visa No.'],
                  visaIssue: excelSerialNumberToDate(row['Visa Issue Date']),
                  visaExpiry: excelSerialNumberToDate(row['Visa Expiry Date']),
                  visaStatus: row['Visa Status'],
                  visaValidity: row['Visa Validity'],
                  company: Company.EXTERNAL,
                  companyTitle: sheetName.split(' ').slice(0, 2).join(' '),
                };

                return await this.adminService.createMultipleEmployees(
                  createEmployeeDto,
                );
              }
            }),
          );

          return {
            sheetName,
            results: results.length,
          };
        }),
      );

      return {
        // message: `Successfully created ${results.length} employees in bulk`,
        message: `Successfully created  employees in bulk`,
        data,
      };
    } catch (error) {
      // Handle errors
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch('update-employee/:employeeId')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('picture'))
  @ApiConsumes('multipart/form-data')
  updateEmployee(
    @Param('employeeId') employeeId: number,
    @UploadedFile() picture: Express.Multer.File,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    updateEmployeeDto.picture = picture;
    return this.adminService.updateEmployee(employeeId, updateEmployeeDto);
  }

  @Delete('employee/:id')
  @UseGuards(JwtAuthGuard)
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
