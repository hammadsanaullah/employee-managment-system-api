import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { QueryRunnerService } from '../query-runner/query-runner.service';

@Injectable()
export class SessionService {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly queryRunner: QueryRunnerService,
  ) {}

  getUser() {
    try {
      const user = this.request['user'];
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  getUserId() {
    try {
      const userId = this.request['user']['id'];
      return userId;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  getUserPhoneNumber() {
    try {
      const userPhoneNumber = this.request['user']['phoneNumber'];
      return userPhoneNumber;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  getUserRole() {
    try {
      const userId = this.request['user']['roles'];
      return userId;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
