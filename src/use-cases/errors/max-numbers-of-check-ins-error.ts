export class MaxNumberofCheckInsError extends Error {
  constructor() {
    super('Max number of check-ins reached.')
  }
}
