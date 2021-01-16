import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {UserProfile} from '../models';
import {ProfileResult} from '../models/profile-result.model';

@injectable({scope: BindingScope.TRANSIENT})
export class AssessmentService {
  constructor(/* Add @inject to inject parameters */) {}

  async getResult(userProfile: UserProfile): Promise<ProfileResult> {
    const result = new ProfileResult({
      stage: '2',
      fromDate: '2021-04-01',
      toDate: '2021-05-31',
    });
    return result;
  }
}
