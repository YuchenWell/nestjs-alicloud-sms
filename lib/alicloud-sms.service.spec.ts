jest.mock('@alicloud/pop-core');
import * as RPCClient from '@alicloud/pop-core';

import { AlicloudSmsService } from './alicloud-sms.service';
import { AlicloudSmsOptions } from './interfaces';

RPCClient.prototype.request = (...args: any): any => {
  return {
    Code: 'OK',
  };
};

describe('AlicloudSmsService (without default options)', () => {
  let smsService: AlicloudSmsService = null;
  let options: AlicloudSmsOptions;

  beforeEach(() => {
    options = {
      config: {
        accessKeyId: '****',
        accessKeySecret: '****',
      },
    };

    smsService = new AlicloudSmsService(options);
  });

  it('should throw error if config is invalid that signname is not provided', async () => {
    await expect(smsService.sendSms('**', '**', {})).rejects.toThrow();
  });

  it('should throw error if config is invalid that regionId is not provided', async () => {
    await expect(smsService.sendSms('**', '**', {})).rejects.toThrow();
  });

  it('should send message successfully if provide signname and regionId via sendSms function', async () => {
    await expect(smsService.sendSms('**', '**', {}, 'signname', 'reginId')).resolves.toEqual({
      Code: 'OK',
    });
  });
});

describe('AlicloudSmsService (with default options)', () => {
  let smsService: AlicloudSmsService = null;
  let options: AlicloudSmsOptions;

  beforeEach(() => {
    options = {
      config: {
        accessKeyId: '****',
        accessKeySecret: '****',
      },
      defaults: {
        regionId: '****',
        signName: '****',
      },
    };

    smsService = new AlicloudSmsService(options);
  });

  it('should send message successfully', async () => {
    await expect(smsService.sendSms('**', '**', {})).resolves.toEqual({
      Code: 'OK',
    });
  });
});
