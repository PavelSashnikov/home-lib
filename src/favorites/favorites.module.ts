import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
// import { GlobalModule } from 'src/global/global.module';

@Module({
  imports: [],
  providers: [FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
