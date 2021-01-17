import {/* inject, */ BindingScope, Getter, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {UserProfile, Vaccination} from '../models';
import {ProfileResult} from '../models/profile-result.model';
import {VaccinationRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class AssessmentService {
  constructor(
    @repository.getter('VaccinationRepository')
    protected vaccinationRepositoryGetter: Getter<VaccinationRepository>,
  ) {}

  async getResult(u: UserProfile): Promise<ProfileResult | undefined> {
    const phase = this.getPhase(u);
    const repo = await this.vaccinationRepositoryGetter();
    const vac = await repo.findOne({
      where: {province: u.province},
    });
    if (!vac) {
      return undefined;
    }
    // eslint-disable-next-line prefer-const
    let [fromDate, toDate] = this.getDateRange(phase, vac);
    if (toDate) {
      const endDate = new Date(toDate);
      endDate.setDate(endDate.getDate() - 1);
      toDate = endDate.toISOString().slice(0, 10);
    }
    return new ProfileResult({
      phase,
      fromDate,
      toDate: toDate || undefined,
    });
  }

  getPhase(u: UserProfile): number {
    if (u.indigenous || (u.frontline && u.healthCare) || u.homeCare) {
      return 1;
    }
    if (u.age >= 60 || u.congregated || (u.frontline && u.essential)) {
      return 2;
    }
    return 3;
  }

  getDateRange(phase: number, vac: Vaccination): string[] {
    if (phase === 1) return [vac.phase1Date, vac.phase2Date];
    else if (phase === 2) return [vac.phase2Date, vac.phase3Date];
    else return [vac.phase3Date, ''];
  }
}
