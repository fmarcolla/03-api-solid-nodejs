import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repostitory'
import { GetUsersMetricsUseCase } from '../get-users-metrics'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetUsersMetricsUseCase(checkInsRepository)

  return useCase
}
