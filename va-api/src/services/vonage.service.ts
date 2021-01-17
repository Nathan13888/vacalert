import {BindingScope, injectable} from '@loopback/core';
import Vonage, {
  CredentialsObject,
  MessageError,
  MessageRequestResponse,
  SendSmsOptions
} from '@vonage/server-sdk';
import config from './vonage.config';

@injectable({scope: BindingScope.TRANSIENT})
export class VonageService {
  VONAGE_API_KEY: string;
  VONAGE_API_SECRET: string;
  TO_NUMBER: string;
  VONAGE_BRAND_NAME: string;

  private v: Vonage;

  constructor() {
    this.VONAGE_API_KEY = config.VONAGE_API_KEY;
    this.VONAGE_API_SECRET = config.VONAGE_API_SECRET;
    this.TO_NUMBER = config.VONAGE_TO_NUMBER;
    this.VONAGE_BRAND_NAME = config.VONAGE_BRAND_NAME;

    this.v = new Vonage(<CredentialsObject>{
      apiKey: this.VONAGE_API_KEY,
      apiSecret: this.VONAGE_API_SECRET,
    });
  }

  sendSMS(
    text: string,
    opts: Partial<SendSmsOptions>,
    callback: (err: MessageError, data: MessageRequestResponse) => void,
  ): void {
    const from = this.VONAGE_BRAND_NAME;
    const to = this.TO_NUMBER;
    this.v.message.sendSms(from, to, text, opts, callback);
  }
}
