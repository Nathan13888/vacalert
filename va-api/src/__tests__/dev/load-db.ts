import csv from 'csv-parser';
import fs from 'graceful-fs';
import {ApiApplication} from '../../application';
import {Vaccination} from '../../models';
import {VaccinationRepository} from '../../repositories';
import {genId} from '../../utils/gen-id';

interface Row {
  Province: string;
  Population: string;
  'First Doses': string;
  'Second Doses': string;
  Received: string;
}

async function loadCSV(file: string): Promise<Vaccination[]> {
  return new Promise<Vaccination[]>(resolve => {
    const vaccinations: Vaccination[] = [];
    fs.createReadStream(file)
      .pipe(csv())
      .on('data', (r: Row) => {
        console.log(r);
        if (!r.Province) return;
        const id = genId();
        const p = new Vaccination();
        p.id = id;
        p.province = r.Province.trim();
        p.population = +r.Population.trim();
        p.firstDoses = +r['First Doses'].trim();
        p.secondDoses = +r['Second Doses'].trim();
        p.received = +r.Received.trim();
        console.log('-->p :>> ', p);
        vaccinations.push(p);
      })
      .on('end', () => {
        console.log('END :>> ', vaccinations);
        resolve(vaccinations);
      });
  });
}

async function loadData(app: ApiApplication): Promise<void> {
  try {
    const repo = await app.getRepository(VaccinationRepository);
    const vs = await loadCSV('data/vaccines.csv');
    await repo.deleteAll();
    await repo.createAll(vs);
  } catch (e) {
    console.log('e :>> ', e);
  }
}

export async function run(args: string[]) {
  console.log('Loading');

  const app = new ApiApplication();
  await app.boot();

  await loadData(app);

  console.log('DONE');

  process.exit(0);
}

run(process.argv).catch(err => {
  console.error('Cannot run', err);
  process.exit(1);
});
