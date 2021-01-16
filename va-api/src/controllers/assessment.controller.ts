import {service} from '@loopback/core';
import {getModelSchemaRef, post, requestBody} from '@loopback/rest';
import {UserProfile} from '../models';
import {ProfileResult} from '../models/profile-result.model';
import {AssessmentService} from '../services/assessment.service';

export class AssessmentController {
  constructor(@service() public assessmentService: AssessmentService) {}

  @post('/assessment/result', {
    responses: {
      '200': {
        description: 'Profile Result',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ProfileResult),
          },
        },
      },
    },
  })
  async getResult(
    @requestBody() userProfile: UserProfile,
  ): Promise<ProfileResult> {
    return this.assessmentService.getResult(userProfile);
  }
}
