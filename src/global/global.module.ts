import { Global, Module } from '@nestjs/common';
import { UserDBService } from './user-db.service';

@Global()
@Module({
  controllers: [],
  providers: [UserDBService],
  exports: [UserDBService],
})
export class GlobalModule {}
