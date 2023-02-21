export interface CryptoI {
  type: 'CRYPTO';
  name: string;
  imageSrc: string;
  index: string;
  price?: number;
  wallet?: string;
  id?: number;
}
