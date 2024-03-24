import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { TimesheetDto } from './dto/timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { TimesheetSiteDto } from './dto/timesheet-site.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../shared/guards/jwt.guard';

@ApiTags('timesheet')
@Controller('timesheet')
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) {}

  // @Post()
  // create(@Body() createTimesheetDto: CreateTimesheetDto) {
  //   return this.timesheetService.create(createTimesheetDto);
  // }

  @Get('get-timesheet-by-employee')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  timesheetByEmployee(@Query() timesheetDto: TimesheetDto) {
    return this.timesheetService.timesheetByEmployee(timesheetDto);
  }

  // @Get('get-timesheet-by-site')
  // //Do this, data isn't correct
  // timesheetBySite(@Query() timesheetSiteDto: TimesheetSiteDto) {
  //   return this.timesheetService.timesheetBySite(timesheetSiteDto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.timesheetService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTimesheetDto: UpdateTimesheetDto) {
  //   return this.timesheetService.update(+id, updateTimesheetDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.timesheetService.remove(+id);
  // }
}
