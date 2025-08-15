import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PropertyModule } from './modules/property/property.module';
import { RateRuleModule } from './modules/rate-rule/rate-rule.module';

@Module({
  imports: [
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
