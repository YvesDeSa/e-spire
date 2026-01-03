import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHealth() {
    return {
      status: 'online',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      service: 'API Mobile Backend',
    };
  }
}