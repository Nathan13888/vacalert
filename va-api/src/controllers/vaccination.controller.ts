import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Vaccination} from '../models';
import {VaccinationRepository} from '../repositories';

export class VaccinationController {
  constructor(
    @repository(VaccinationRepository)
    public vaccinationRepository : VaccinationRepository,
  ) {}

  @post('/vaccinations', {
    responses: {
      '200': {
        description: 'Vaccination model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vaccination)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vaccination, {
            title: 'NewVaccination',
            exclude: ['id'],
          }),
        },
      },
    })
    vaccination: Omit<Vaccination, 'id'>,
  ): Promise<Vaccination> {
    return this.vaccinationRepository.create(vaccination);
  }

  @get('/vaccinations/count', {
    responses: {
      '200': {
        description: 'Vaccination model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Vaccination) where?: Where<Vaccination>,
  ): Promise<Count> {
    return this.vaccinationRepository.count(where);
  }

  @get('/vaccinations', {
    responses: {
      '200': {
        description: 'Array of Vaccination model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Vaccination, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Vaccination) filter?: Filter<Vaccination>,
  ): Promise<Vaccination[]> {
    return this.vaccinationRepository.find(filter);
  }

  @patch('/vaccinations', {
    responses: {
      '200': {
        description: 'Vaccination PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vaccination, {partial: true}),
        },
      },
    })
    vaccination: Vaccination,
    @param.where(Vaccination) where?: Where<Vaccination>,
  ): Promise<Count> {
    return this.vaccinationRepository.updateAll(vaccination, where);
  }

  @get('/vaccinations/{id}', {
    responses: {
      '200': {
        description: 'Vaccination model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vaccination, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vaccination, {exclude: 'where'}) filter?: FilterExcludingWhere<Vaccination>
  ): Promise<Vaccination> {
    return this.vaccinationRepository.findById(id, filter);
  }

  @patch('/vaccinations/{id}', {
    responses: {
      '204': {
        description: 'Vaccination PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vaccination, {partial: true}),
        },
      },
    })
    vaccination: Vaccination,
  ): Promise<void> {
    await this.vaccinationRepository.updateById(id, vaccination);
  }

  @put('/vaccinations/{id}', {
    responses: {
      '204': {
        description: 'Vaccination PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vaccination: Vaccination,
  ): Promise<void> {
    await this.vaccinationRepository.replaceById(id, vaccination);
  }

  @del('/vaccinations/{id}', {
    responses: {
      '204': {
        description: 'Vaccination DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vaccinationRepository.deleteById(id);
  }
}
