import { PartialType } from '@nestjs/mapped-types';
import { TimesheetDto } from './timesheet.dto';

export class UpdateTimesheetDto extends PartialType(TimesheetDto) {}
