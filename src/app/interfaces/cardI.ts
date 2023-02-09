export type valute = 'EUR' | 'RUB' | 'USD' | 'BEP-20' | 'SV'

export interface CardI{
  imageSrc: string,
  name: string,
  valute: '' | valute,
  value: string
}