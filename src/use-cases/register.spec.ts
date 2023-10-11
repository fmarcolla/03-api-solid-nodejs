import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('Should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Felipe',
      email: 'felipe@teste.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should hash user password upon registration', async () => {
    const userPassword = '123456'

    const { user } = await sut.execute({
      name: 'Felipe',
      email: 'felipe@teste.com',
      password: userPassword,
    })

    const hashPasswordVerification = await compare(
      userPassword,
      user.password_hash,
    )

    expect(hashPasswordVerification).toBe(true)
  })

  it('Should not be able register user email twice', async () => {
    const email = 'felipe@teste.com'

    await sut.execute({
      name: 'Felipe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Felipe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
