export type valute = 'EUR' | 'RUB' | 'USD' | 'BEP-20' | 'SV'

export interface CardI{
  image: string,
  name: string,
  valute: '' | valute,
  value: string,
  type?: string
}