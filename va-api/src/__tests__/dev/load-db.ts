import csv from 'csv-parser';
import fs from 'graceful-fs';
import {ApiApplication} from '../../application';
import {Location, Vaccination} from '../../models';
import {LocationRepository, VaccinationRepository} from '../../repositories';

interface Vac {
  Province: string;
  Population: string;
  'First Doses': string;
  'Second Doses': string;
  Received: string;
}

interface Loc {
  name: string;
  address: string;
  phone: string;
  lat: string;
  lng: string;
  url: string;
}

async function loadVacs(file: string): Promise<Vaccination[]> {
  return new Promise<Vaccination[]>(resolve => {
    const vaccinations: Vaccination[] = [];
    fs.createReadStream(file)
      .pipe(csv())
      .on('data', (r: Vac) => {
        console.log(r);
        if (!r.Province) return;
        const p = new Vaccination();
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

async function loadLocs(file: string): Promise<Location[]> {
  return new Promise<Location[]>(resolve => {
    const locations: Location[] = [];
    fs.createReadStream(file)
      .pipe(csv())
      .on('data', (r: Loc) => {
        console.log(r);
        if (!r.name) return;
        const loc = new Location({
          name: r.name,
          address: r.address,
          phone: r.phone,
          lat: +r.lat,
          lng: +r.lng,
          url: r.url,
        });
        console.log('-->loc :>> ', loc);
        locations.push(loc);
      })
      .on('end', () => {
        console.log('END :>> ', locations);
        resolve(locations);
      });
  });
}

async function loadData(app: ApiApplication): Promise<void> {
  try {
    const repoVac = await app.getRepository(VaccinationRepository);
    const vs = await loadVacs('data/vaccines.csv');
    await repoVac.deleteAll();
    await repoVac.createAll(vs);

    const repoLoc = await app.getRepository(LocationRepository);
    const locs = await loadLocs('data/locations.csv');
    await repoLoc.deleteAll();
    await repoLoc.createAll(locs);
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
