import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUsersMetricsUseCaseRequest {
  userId: string
}

interface GetUsersMetricsUseCaseReponse {
  checkInsCount: number
}

export class GetUsersMetricsUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUsersMetricsUseCaseRequest): Promise<GetUsersMetricsUseCaseReponse> {
    const checkInsCount = await this.checkInRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
