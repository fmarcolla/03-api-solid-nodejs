import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repostitory'
import { FetchUserCheckInHistoryUseCase } from '../fetch-user-check-ins-history'

export function makeFecthUsersCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInHistoryUseCase(checkInsRepository)

  return useCase
}
