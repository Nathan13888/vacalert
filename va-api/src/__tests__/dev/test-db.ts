import {ApiApplication} from '../../application';
import {VaccinationRepository} from '../../repositories';

// const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function test(app: ApiApplication): Promise<void> {
  try {
    const repo = await app.getRepository(VaccinationRepository);
    const f = await repo.find();
    console.log('f :>> ', f);
    console.log('connected');
  } catch (e) {
    console.log('e :>> ', e);
  }
}

export async function run(args: string[]) {
  console.log('Running Test');

  const app = new ApiApplication();
  await app.boot();

  await test(app);

  console.log('DONE');

  process.exit(0);
}

run(process.argv).catch(err => {
  console.error('Cannot run', err);
  process.exit(1);
});
