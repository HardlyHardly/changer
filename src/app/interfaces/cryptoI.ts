export interface CryptoI {
  type: 'CRYPTO';
  name: string;
  image: string;
  symbol: string;
  price?: number;
  wallet?: string;
  id?: number;
}
