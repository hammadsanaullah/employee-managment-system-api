import { Connection, DeepPartial, Not } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Logger } from '@nestjs/common';
import { Crypt } from '../../shared/services/crypter/crypt';
import { Admin } from '../../resources/admin/entities/admin.entity';
import { User } from '../../resources/user/entities/user.entity';
import { Site } from '../../resources/site/entities/site.entity';
import { Rate } from '../../resources/rate/entities/rate.entity';

export class Seed implements Seeder {
  logger = new Logger(Seed.name);

  public async run(factory: Factory, connection: Connection): Promise<void> {
    try {
      const adminRepo = connection.manager.getRepository(Admin);
      const userRepo = connection.manager.getRepository(User);
      const siteRepo = connection.manager.getRepository(Site);
      const rateRepo = connection.manager.getRepository(Rate);
      const adminTemplate = {
        username: 'admin',
        email: 'admin@admin.com',
        phoneNumber: '+923212345678',
        name: 'super_admin',
        role: 'ADMIN',
      };

      const password = 'password';

      const hashedPassword = await Crypt.hashString(password);
      const admins = await adminRepo.find();
      if (admins.length === 0) {
        await adminRepo.save({
          password: hashedPassword,
          ...adminTemplate,
        } as DeepPartial<Admin>);
      }

      const uniqueUserAttributes = [
        {
          firstName: 'john',
          lastName: 'wick',
          phoneNumber: '+923212345677',
          email: 'user1@user.com',
          role: 'Welder',
          barCode: 'barCode1',
          employeeCode: 'employeeCode1',
          noOfLeaves: 10,
          emirateId: '1',
          company: 'INTERNAL',
        },
        {
          firstName: 'jane',
          lastName: 'doe',
          phoneNumber: '+923212345678',
          email: 'user2@user.com',
          role: 'Builder',
          barCode: 'barCode2',
          employeeCode: 'employeeCode2',
          noOfLeaves: 10,
          emirateId: '2',
          company: 'INTERNAL',
        },
        {
          firstName: 'alice',
          lastName: 'smith',
          phoneNumber: '+923212345679',
          email: 'user3@user.com',
          role: 'Fabricator',
          barCode: 'barCode3',
          employeeCode: 'employeeCode3',
          noOfLeaves: 10,
          emirateId: '3',
          company: 'INTERNAL',
        },
      ];

      const uniqueSiteAttributes = [
        {
          companyName: 'Apple',
          site: 'California Site',
          emirates: 'Downtown',
          shiftHours: 8,
        },
        {
          companyName: 'Google',
          site: 'Mountain View Site',
          emirates: 'Silicon Valley',
          shiftHours: 7,
        },
        {
          companyName: 'Microsoft',
          site: 'Redmond Site',
          emirates: 'Washington',
          shiftHours: 6,
        },
      ];

      const uniqueRateAttributes = [{ rate: 10 }, { rate: 20 }, { rate: 30 }];

      for (let i = 0; i < 3; i++) {
        const user = await userRepo.save({
          ...uniqueUserAttributes[i],
        });

        const site = await siteRepo.save({
          ...uniqueSiteAttributes[i],
        });

        await rateRepo.save({
          ...uniqueRateAttributes[i],
        });
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}
