import { Inject, Injectable, Logger } from '@nestjs/common';

import * as RPCClient from '@alicloud/pop-core';

import { ALICLOUD_SMS_MODULE_OPTIONS } from './alicloud-sms.constant';
import { AlicloudSmsOptions } from './interfaces/alicloud-sms-options.interface';
import { AlicloudSmsResponse } from './interfaces/alicloud-sms-response.interface';

@Injectable()
export class AlicloudSmsService {
  private client: RPCClient;

  constructor(
    @Inject(ALICLOUD_SMS_MODULE_OPTIONS)
    private readonly options: AlicloudSmsOptions,
  ) {
    const config = {
      ...{
        endpoint: 'https://dysmsapi.aliyuncs.com',
        apiVersion: '2017-05-25',
      },
      ...options.config,
    };

    this.client = new RPCClient(config);
  }

  /**
   * Send message.
   * @template T
   * @param {string} templateCode 短信模板ID
   * @param {string | string[]} phoneNumber 接收短信的手机号码
   * @param {T} templateParam 短信模板变量对应的实际值，JSON格式
   * @param {string} [signName] 短信签名名称
   * @param {string} [regionId] 地区ID
   * @returns {(Promise<boolean | null>)}
   * @memberof AlicloudSmsService
   */
  public async sendSms(
    templateCode: string,
    phoneNumbers: string | string[],
    templateParam: object | string,
    signName?: string,
    regionId?: string,
  ): Promise<AlicloudSmsResponse | null> {
    if (!signName && !this.options?.defaults?.signName) {
      Logger.error('Error encountered: "SignName" was not provided.');
    }

    if (!regionId && !this.options?.defaults?.regionId) {
      Logger.error('Error encountered: "RegionId" was not provided.');
    }

    const params = {
      RegionId: regionId ?? this.options.defaults.regionId,
      SignName: signName ?? this.options.defaults.signName,
      PhoneNumbers: Array.isArray(phoneNumbers) ? phoneNumbers.join(',') : phoneNumbers,
      TemplateCode: templateCode,
      TemplateParam: typeof templateParam === 'string' ? templateParam : JSON.stringify(templateParam),
    };

    try {
      const requestOption = { method: 'POST' };

      const response: AlicloudSmsResponse = await this.client.request('SendSms', params, requestOption);

      if (this.options.logger) {
        if (response.Message === 'OK') {
          Logger.log(`Sent message to "${params.PhoneNumbers}" successfully.`, 'AlicloudSmsModule');
        } else {
          Logger.warn(
            `Sent message to "${params.PhoneNumbers}" failed, response "${response.Message}".`,
            'AlicloudSmsModule',
          );
        }
      }

      return response;
    } catch (err) {
      throw new Error(err);
    }
  }
}
