import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Bodybuilder Gym',
        description: 'For Bodybuilders',
        phone: '48999999999',
        latitude: -20.2119472,
        longitude: -40.8996864,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Life Gym',
        description: 'For Bodybuilders',
        phone: '48999999999',
        latitude: -27.1602291,
        longitude: -48.8806376,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -20.2119472,
        longitude: -40.8996864,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Bodybuilder Gym',
      }),
    ])
  })
})
