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
      const userTemplate = {
        firstName: 'john',
        lastName: 'wick',
        phoneNumber: '+923212345677',
        email: 'user@user.com',
        role: 'Welder',
        barCode: 'barCode',
        employeeCode: 'employeeCode',
        noOfLeaves: 10,
        company: 'INTERNAL'
      };
      const users = await userRepo.find();
      if(users.length === 0) {
        await userRepo.save({...userTemplate})
      }
      const siteTemplate = {
        companyName: 'Apple',
        site: 'California Site',
        emirates: 'Downtown',
        shiftHours: 8,
      }
      const sites = await siteRepo.find();
      let site: Site;
      if(sites.length === 0) {
        site = await siteRepo.save({...siteTemplate})
        const rateTemplate = {
          siteId: site.id,
          role: 'Welder',
          rate: 10,
        }
        await rateRepo.save({...rateTemplate})
      }

    } catch (error) {
      this.logger.error(error);
    }
  }
}
