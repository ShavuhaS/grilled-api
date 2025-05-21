import { Module } from '@nestjs/common';
import { CaslPolicyModule } from './policies/casl-policy.module';
import { CaslFactoryModule } from './factories/casl-factory.module';

@Module({
  exports: [CaslPolicyModule, CaslFactoryModule],
  imports: [CaslPolicyModule, CaslFactoryModule],
})
export class CaslModule {}
