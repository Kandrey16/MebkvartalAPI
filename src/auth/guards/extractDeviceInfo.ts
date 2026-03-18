import { BadRequestException } from '@nestjs/common';
import { IDeviceInfo } from '../types/device.type';
import { Request } from 'express';

export function extractDeviceInfo(req: Request): IDeviceInfo {
  const userAgent = req.headers['user-agent'];
  const deviceId = req.headers['x-device-id'];

  if (typeof userAgent !== 'string') {
    throw new BadRequestException('Invalid user-agent');
  }

  if (typeof deviceId !== 'string') {
    throw new BadRequestException('Invalid device id');
  }

  return { userAgent, deviceId };
}
