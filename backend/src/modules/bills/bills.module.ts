import { Module } from '@nestjs/common';
import { BillCalculatorService } from './bills.service';

@Module({
  controllers: [],
  providers: [BillCalculatorService],
})
export class BillsModule {}
