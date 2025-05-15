import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { PrismaModule } from '../../database/prisma.module';

@Module({
  providers: [TestService],
  exports: [TestService],
  imports: [PrismaModule],
})
export class TestModule {}
