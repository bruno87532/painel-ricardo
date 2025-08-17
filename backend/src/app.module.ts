import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PropertyModule } from './modules/property/property.module';
import { RateRuleModule } from './modules/rate-rule/rate-rule.module';
import { SurchargeModule } from './modules/surcharge/surcharge.module';

@Module({
  imports: [
    SurchargeModule,
    RateRuleModule,
    PropertyModule,
    AuthModule, 
    AdminModule, 
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    })
  ],
})
export class AppModule {}
