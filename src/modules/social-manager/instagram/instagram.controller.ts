import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Param,
    Delete,
    UseGuards,
    ParseUUIDPipe,
  } from '@nestjs/common';
  import { InstagramSchedulerService } from './instagram.service';
  import { CreateScheduledPostDto } from './dto/create-scheduled-post.dto';
  import { UpdateScheduledPostDto } from './dto/update-scheduled-post.dto';
  import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
  
  @UseGuards(JwtAuthGuard)
  @Controller('social/instagram')
  export class InstagramController {
    constructor(private readonly service: InstagramSchedulerService) {}
  
    @Post('schedule')
    async schedulePost(@Body() dto: CreateScheduledPostDto) {
      return await this.service.schedulePost(dto);
    }
  
    @Get('scheduled')
    async getScheduledPosts() {
      return await this.service.getAllScheduledPosts();
    }
  
    @Put('schedule/:id')
    async updatePost(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() dto: UpdateScheduledPostDto,
    ) {
      return await this.service.updateScheduledPost(id, dto);
    }
  
    @Delete('schedule/:id')
    async cancelPost(@Param('id', ParseUUIDPipe) id: string) {
      return await this.service.deleteScheduledPost(id);
    }
  }
  