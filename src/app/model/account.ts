export interface Account {
  id: string,
  name: string,
  group: string,
  currency?: string,
  openBal?: number,
  openDate?: Date
}
