import { DynamicModule, Module, Global } from '@nestjs/common';

import { AlicloudSmsOptions } from './interfaces/alicloud-sms-options.interface';
import { ALICLOUD_SMS_MODULE_OPTIONS } from './alicloud-sms.constant';
import { AlicloudSmsService } from './alicloud-sms.service';

@Global()
@Module({
  providers: [AlicloudSmsService],
  exports: [AlicloudSmsService],
})
export class AlicloudSmsModule {
  public static forRoot(options: AlicloudSmsOptions): DynamicModule {
    return {
      module: AlicloudSmsModule,
      providers: [{ provide: ALICLOUD_SMS_MODULE_OPTIONS, useValue: options }],
    };
  }
}
