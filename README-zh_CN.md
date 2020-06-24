<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  一个基于 Nest(node.js) 框架封装的 <a href="https://www.aliyun.com/product/sms">阿里云短信服务 SMS</a> 模块。   
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/nestjs-alicloud-sms"><img src="https://img.shields.io/npm/v/nestjs-alicloud-sms.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/nestjs-alicloud-sms"><img src="https://img.shields.io/npm/l/nestjs-alicloud-sms.svg" alt="Package License" /></a>
</p>

[English](README.md) | 简体中文

## 安装前

1. 创建阿里云账号
2. 购买短信服务. ([产品链接](https://www.aliyun.com/product/sms))
3. 申请 SMS 签名，到 **控制台 > 短信服务 > 国内消息 > 添加签名**
4. 创建短信模板, 到 **控制台 > 短信服务 > 国内消息 > 模板管理 > 添加模板**.

### 安装

```bash
npm install --save nestjs-alicloud-sms
#or
yarn add nestjs-alicloud-sms
```

### 文档

1. 使用如下配置导入 `AlicloudSmsModule`:

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

2. 发送信息

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
