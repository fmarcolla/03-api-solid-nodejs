import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gyms'

let gymRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymRepository)
  })

  it('should be able to fetch check-in history', async () => {
    await gymRepository.create({
      title: 'Life Gym',
      description: null,
      phone: null,
      latitude: -20.2119472,
      longitude: -40.8996864,
    })

    await gymRepository.create({
      title: 'Bodybuilder Gym',
      description: null,
      phone: null,
      latitude: -20.2119472,
      longitude: -40.8996864,
    })

    const { gyms } = await sut.execute({
      query: 'Life',
      page: 1,
    })

    expect(gyms).toHaveLength(1)

    expect(gyms).toEqual([expect.objectContaining({ title: 'Life Gym' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `Bodybuilder Gym ${i}`,
        description: null,
        phone: null,
        latitude: -20.2119472,
        longitude: -40.8996864,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Bodybuilder',
      page: 2,
    })

    expect(gyms).toHaveLength(2)

    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Bodybuilder Gym 21' }),
      expect.objectContaining({ title: 'Bodybuilder Gym 22' }),
    ])
  })
})
