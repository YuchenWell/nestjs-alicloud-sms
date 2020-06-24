<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  A short message module for Nest framework (node.js) using <a href="https://www.aliyun.com/product/sms">Alicloud SMS</a> service.   
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/nestjs-alicloud-sms"><img src="https://img.shields.io/npm/v/nestjs-alicloud-sms.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/nestjs-alicloud-sms"><img src="https://img.shields.io/npm/l/nestjs-alicloud-sms.svg" alt="Package License" /></a>
</p>

English | [简体中文](README-zh_CN.md)

## Before Installation

1. Create Alicloud account
2. Purchase SMS. ([read more](https://www.aliyun.com/product/sms))
3. Apply for SMS sign name and message template, go to **Dashboard > Short Message Service > Domestic Message > Add Singname**
4. Create message template, go to **Dashboard > Short Message Service > Domestic Message > Templates Management > Add Template**.

### Installation

```bash
npm install --save nestjs-alicloud-sms
#or
yarn add nestjs-alicloud-sms
```

### Documentation

1. Import the `AlicloudSmsModule` with the following configuration:

```typescript
import { Module } from '@nestjs/common';
import { AlicloudSmsModule } from 'nestjs-alicloud-sms';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    AlicloudSmsModule.forRoot({
      config: { accessKeyId: '***', accessKeySecret: '***' },
      defaults: { signName: '***', regionId: 'cn-hangzhou' },
    }),
  ],
})
export class AppModule {}
```

2. Send Message

```typescript
import { Controller, Logger, Post } from '@nestjs/common';
import { AlicloudSmsService } from 'nestjs-alicloud-sms';

@Controller()
export class AppController {
  constructor(private readonly smsService: AlicloudSmsService) {}

  @Post('sms/send')
  async sendSms(): Promise<any> {
    const templateCodeId = 'SMS_1490999999';
    const phoneNumber = '1388886666';
    const templateParam = { code: '888666' };

    const sendResponse = await this.smsService.sendSms(templateCodeId, phoneNumber, templateParam);

    if (sendResponse.Code === 'OK') {
      // success
    } else {
      // failed
    }
  }
}
```

### License

The [MIT](LICENSE) License.
