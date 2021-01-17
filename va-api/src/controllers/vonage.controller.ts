import {service} from '@loopback/core';
import {post, requestBody} from '@loopback/rest';
import {VonageService} from '../services';

export class VonageController {
  constructor(@service(VonageService) public vonageService: VonageService) {}

  // Map to `GET /ping`
  @post('/vonage/sms/send', {
    responses: {
      '204': {
        description: 'Successfully sent',
      },
    },
  })
  smsSend(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'string',
          },
        },
      },
    })
    text: string,
  ): void {
    this.vonageService.sendSMS(text, {}, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        if (data.messages[0]['status'] === '0') {
          console.log('Message sent successfully.');
        } else {
          console.log(
            `Message failed with error: ${data.messages[0]['error-text']}`,
          );
        }
      }
    });
  }
}
