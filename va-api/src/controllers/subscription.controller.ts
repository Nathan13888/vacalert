import {service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {getModelSchemaRef, post, requestBody} from '@loopback/rest';
import {
  BrowserSubscription,
  EmailSubscription,
  SmsSubscription,
} from '../models';
import {
  BrowserSubscriptionRepository,
  EmailSubscriptionRepository,
  SmsSubscriptionRepository,
} from '../repositories';
import {VonageService} from '../services';

export class SubscriptionController {
  constructor(
    @repository(BrowserSubscriptionRepository)
    public browserSubscriptionRepository: BrowserSubscriptionRepository,
    @repository(EmailSubscriptionRepository)
    public emailSubscriptionRepository: EmailSubscriptionRepository,
    @repository(SmsSubscriptionRepository)
    public smsSubscriptionRepository: SmsSubscriptionRepository,
    @service(VonageService) public vonageService: VonageService,
  ) {}

  @post('/subscription/email', {
    responses: {
      '204': {
        description: 'Successfully subscribed',
      },
    },
  })
  async subscribeEmail(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmailSubscription),
        },
      },
    })
    emailSubscription: EmailSubscription,
  ): Promise<void> {
    await this.emailSubscriptionRepository.create(emailSubscription);
  }

  @post('/subscription/browser', {
    responses: {
      '204': {
        description: 'Successfully subscribed',
      },
    },
  })
  async subscribeBrowserNotifications(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BrowserSubscription),
        },
      },
    })
    browserSubscription: BrowserSubscription,
  ): Promise<void> {
    await this.browserSubscriptionRepository.create(browserSubscription);
  }

  @post('/subscription/sms', {
    responses: {
      '204': {
        description: 'Successfully subscribed',
      },
    },
  })
  async subscribeSMS(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SmsSubscription),
        },
      },
    })
    smsSubscription: SmsSubscription,
  ): Promise<void> {
    await this.smsSubscriptionRepository.create(smsSubscription);
  }
}
