import { Injectable } from '@angular/core';
import { CardI } from '../interfaces/cardI';
import { ChangeI } from '../interfaces/changeI';
import { CryptoI } from '../interfaces/cryptoI';

@Injectable({
  providedIn: 'root'
})
export class GlobaldataService {

  private iconsPath: string = 'assets/icons/';

  private cryptos: CryptoI[] = [
    // {type: 'CRYPTO', name: 'AdvCash', image: this.iconsPath + 'adv.svg'},
    // {type: 'CRYPTO', name: 'Avalanche', image: this.iconsPath + 'avax.svg'},
    // {type: 'CRYPTO', name: 'Algorand', image: this.iconsPath + 'algo.svg'},
    // {type: 'CRYPTO', name: 'Binance Coin', image: this.iconsPath + 'bnb.svg'},
    // {type: 'CRYPTO', name: 'Binance USD', image: this.iconsPath + 'busd.svg'},
    {symbol: 'BTC', type: 'CRYPTO', name: 'Bitcoin', image: this.iconsPath + 'btc.svg'},
    // {type: 'CRYPTO', name: 'Bitcoin Cash', image: this.iconsPath + 'bch.svg'},
    // {type: 'CRYPTO', name: 'Bitcoin Gold', image: this.iconsPath + 'btg.svg'},
    // {type: 'CRYPTO', name: 'Bitcoin SV', image: this.iconsPath + 'bsv.svg'},
    // {type: 'CRYPTO', name: 'Bitcoin без AML', image: this.iconsPath + 'btc.svg'},
    {symbol: 'ADA', type: 'CRYPTO', name: 'Cardano', image: this.iconsPath + 'ada.svg'},
    // {type: 'DeFi', name: 'ChainLink', image: this.iconsPath + 'link.svg'},
    // {type: 'CRYPTO', name: 'Cosmos', image: this.iconsPath + 'atom.svg'},
    // {type: 'CRYPTO', name: 'Cronos', image: this.iconsPath + 'cro.svg'},
    // {type: 'DeFi', name: 'Dai', image: this.iconsPath + 'dai.svg'},
    {symbol: 'DASH', type: 'CRYPTO', name: 'Dash', image: this.iconsPath + 'dash.svg'},
    // {type: 'CRYPTO', name: 'Decentraland', image: this.iconsPath + 'mana.svg'},
    {symbol: 'DOGE', type: 'CRYPTO', name: 'Dogecoin', image: this.iconsPath + 'doge.svg'},
    // {type: 'CRYPTO', name: 'EOS', image: this.iconsPath + 'eos.svg'},
    // {type: 'CRYPTO', name: 'Ether Classic', image: this.iconsPath + 'etc.svg'},
    // {type: 'CRYPTO', name: 'Ethereum', image: this.iconsPath + 'eth.svg'},
    // {type: 'CRYPTO', name: 'EthereumPoW', image: this.iconsPath + 'ethw.svg'},
    {symbol: 'LTC', type: 'CRYPTO', name: 'Litecoin', image: this.iconsPath + 'ltc.svg'},
    {symbol: 'XMR', type: 'CRYPTO', name: 'Monero', image: this.iconsPath + 'xmr.svg'},
    // {type: 'CRYPTO', name: 'NEAR Protocol', image: this.iconsPath + 'near.svg'},
    // {type: 'CRYPTO', name: 'Paxos', image: this.iconsPath + 'pax.svg'},
    // {type: 'DeFi', name: 'Polkadot  ', image: this.iconsPath + 'dot.svg'},
    // {type: 'CRYPTO', name: 'Polygon', image: this.iconsPath + 'matic.svg'},
    // {type: 'CRYPTO', name: 'Qtum', image: this.iconsPath + 'qtum.svg'},
    // {type: 'DeFi', name: 'Ravencoin', image: this.iconsPath + 'rvn.svg'},
    {symbol: 'XRP', type: 'CRYPTO', name: 'Ripple', image: this.iconsPath + 'xrp.svg'},
    // {type: 'CRYPTO', name: 'Shiba Inu', image: this.iconsPath + 'shib.svg'},
    // {type: 'CRYPTO', name: 'Solana', image: this.iconsPath + 'sol.svg'},
    // {type: 'CRYPTO', name: 'Stellar', image: this.iconsPath + 'xlm.svg'},
    // {type: 'CRYPTO', name: 'Terra', image: this.iconsPath + 'luna.svg'},
    // {type: 'CRYPTO', name: 'Terra Classic', image: this.iconsPath + 'lunc.svg'},
    {symbol: 'USDT', type: 'CRYPTO', name: 'Tether', image: this.iconsPath + 'usdt.svg'},
    // {index: 'USDT', type: 'CRYPTO', name: 'Tether ERC-20', image: this.iconsPath + 'usdt.svg'},
    // {index: 'USDT', type: 'CRYPTO', name: 'Tether Omni', image: this.iconsPath + 'usdt.svg'},
    // {index: 'USDT', type: 'CRYPTO', name: 'Tether SPL', image: this.iconsPath + 'usdt.svg'},
    // {index: 'USDT', type: 'CRYPTO', name: 'Tether TRC-20', image: this.iconsPath + 'usdt.svg'},
    // {type: 'CRYPTO', name: 'Tezos', image: this.iconsPath + 'xtz.svg'},
    // {type: 'CRYPTO', name: 'Toncoin', image: this.iconsPath + 'ton.svg'},
    {symbol: 'TRX', type: 'CRYPTO', name: 'TRON', image: this.iconsPath + 'trx.svg'},
    // {type: 'CRYPTO', name: 'TrueUSD', image: this.iconsPath + 'tusd.svg'},
    // {type: 'CRYPTO', name: 'Trust Wallet Token', image: this.iconsPath + 'twt.svg'},
    // {type: 'DeFi', name: 'Uniswap', image: this.iconsPath + 'uni.svg'},
    // {type: 'CRYPTO', name: 'USD Coin', image: this.iconsPath + 'usdc.svg'},
    // {type: 'CRYPTO', name: 'VeChain', image: this.iconsPath + 'vet.svg'},
    // {type: 'CRYPTO', name: 'Waves', image: this.iconsPath + 'waves.svg'},
    // {type: 'CRYPTO', name: 'Wrapped Bitcoin', image: this.iconsPath + 'wbtc.svg'},
    // {type: 'CRYPTO', name: 'Yearn.finance', image: this.iconsPath + 'yfi.svg'},
    {symbol: 'ZEC', type: 'CRYPTO', name: 'Zcash', image: this.iconsPath + 'zec.svg'}
];


  private changed: Array<ChangeI> = [
    ...this.cryptos,
    {symbol: 'RUB',type: 'BANK', name: 'Alfa Bank', image: this.iconsPath + 'alfa_bank.svg'},
    {symbol: 'RUB',type: 'BANK', name: 'Raiffeisen Bank', image: this.iconsPath +  'raiffeisen.svg'},
    {symbol: 'RUB',type: 'BANK', name: 'МИР', image: this.iconsPath +  'mir.svg'},
    {symbol: 'RUB',type: 'BANK', name: 'Sberbank', image: this.iconsPath +  'sberbank.svg'},
    {symbol: 'RUB',type: 'BANK', name: 'Tinkoff', image: this.iconsPath +  'tinkoff.svg'},
    {symbol: 'RUB',type: 'BANK', name: 'Tinkoff QR-коды', image: this.iconsPath +  'tinkoff.svg'},
    {symbol: 'RUB',type: 'BANK', name: 'Visa/MasterCard', image: this.iconsPath +  'visamc.svg'},
    {symbol: 'RUB',type: 'BANK', name: 'VTB', image: this.iconsPath +  'vtb.svg'},
    {symbol: 'RUB',type: 'BANK', name: 'Ак Барс', image: this.iconsPath +  'akbrub.svg'},
    {symbol: 'RUB',type: 'BANK', name: 'Payer', image: this.iconsPath + 'payeer.svg'},
    {symbol: 'RUB',type: 'BANK', name: 'Qiwi', image: this.iconsPath + 'qwrub.svg'},
    {symbol: 'RUB',type: 'BANK', name: 'Виртуальная карта', image: this.iconsPath +  'bankcard.svg'},
    {symbol: 'RUB',type: 'BANK', name: 'Газпромбанк', image: this.iconsPath +  'gpb.svg'},
    {symbol: 'RUB',type: 'BANK', name: 'Кукуруза', image: this.iconsPath +  'kuk.svg'},
    {symbol: 'RUB',type: 'BANK', name: 'Открытие', image: this.iconsPath +  'openbank.svg'},
    {symbol: 'RUB',type: 'BANK', name: 'Почта Банк', image: this.iconsPath +  'pochtabank.svg'},
    {symbol: 'RUB',type: 'BANK', name: 'Росбанк', image: this.iconsPath +  'ros.svg'},
    {symbol: 'RUB',type: 'BANK', name: 'Русский Стандарт', image: this.iconsPath +  'russt.svg'},
    {symbol: 'RUB',type: 'BANK', name: 'Яндекс.Деньги', image: this.iconsPath +  'yamoney.svg'},
    {symbol: 'RUB',type: 'BANK', name: 'Home Bank', image: this.iconsPath + 'homebank.svg'},
  ]

  private cards: CardI[] = [
    {type: 'CRYPTO', name: 'AdvCash', image: this.iconsPath + 'adv.svg', valute: 'EUR', value: '39588,78'},
    {type: 'CRYPTO', name: 'AdvCash', image: this.iconsPath + 'adv.svg', valute: 'RUB', value: '3741073,82'},
    {type: 'CRYPTO', name: 'AdvCash', image: this.iconsPath + 'adv.svg', valute: 'RUB', value: '3741073,82'},
    {type: 'BANK', name: 'Alfa Bank', image: this.iconsPath + 'alfa_bank.svg', valute: '', value: '2931365,17'},
    {type: 'CRYPTO', name: 'Algorand', image: this.iconsPath + 'algo.svg', valute: '', value: '199661,8213'},
    {type: 'CRYPTO', name: 'Avalanche', image: this.iconsPath + 'avax.svg', valute: '', value: '58756,3622'},
    {type: 'CRYPTO', name: 'Avalanche', image: this.iconsPath + 'avax.svg', valute: 'BEP-20', value: '58756,3622'},
    {type: 'CRYPTO', name: 'Binance Coin', image: this.iconsPath + 'bnb.svg', valute: '', value: '13674,7406'},
    {type: 'CRYPTO', name: 'Binance Coin', image: this.iconsPath + 'bnb.svg', valute: 'BEP-20', value: '13724,7358'},
    {type: 'CRYPTO', name: 'Binance USD', image: this.iconsPath + 'busd.svg', valute: '', value: '3075716'},
    {type: 'CRYPTO', name: 'Binance USD', image: this.iconsPath + 'busd.svg', valute: 'BEP-20', value: '3122751,3756'},
    {type: 'CRYPTO', name: 'Bitcoin', image: this.iconsPath + 'btc.svg', valute: '', value: '37,2305'},
    {type: 'CRYPTO', name: 'Bitcoin', image: this.iconsPath + 'btc.svg', valute: 'BEP-20', value: '65,1095'},
    {type: 'CRYPTO', name: 'Bitcoin Cash', image: this.iconsPath + 'bch.svg', valute: '', value: '3152,7883'},
    {type: 'CRYPTO', name: 'Bitcoin Cash', image: this.iconsPath + 'bch.svg', valute: 'BEP-20', value: '2350'},
    {type: 'CRYPTO', name: 'Bitcoin Gold', image: this.iconsPath + 'btg.svg', valute: '', value: '15008,9455'},
    {type: 'CRYPTO', name: 'Bitcoin SV', image: this.iconsPath + 'bsv.svg', valute: 'SV', value: '17476,3444'},
    {type: 'CRYPTO', name: 'Bitcoin без AML', image: this.iconsPath + 'btc.svg', valute: '', value: '57,9798'},
    {type: 'CRYPTO', name: 'Cardano', image: this.iconsPath + 'ada.svg', valute: '', value: '7276533,7574'},
    {type: 'CRYPTO', name: 'Cardano', image: this.iconsPath + 'ada.svg', valute: 'BEP-20', value: '7276533,7574'},
    {type: 'DeFi', name: 'ChainLink', image: this.iconsPath + 'link.svg', valute: '', value: '23005,0229'},
    {type: 'CRYPTO', name: 'ChainLink', image: this.iconsPath + 'link.svg', valute: 'BEP-20', value: '23005,0229'},
    {type: 'CRYPTO', name: 'Cosmos', image: this.iconsPath + 'atom.svg', valute: '', value: '372906,7112'},
    {type: 'CRYPTO', name: 'Cronos', image: this.iconsPath + 'cro.svg', valute: '', value: '998828,4483'},
    {type: 'DeFi', name: 'Dai', image: this.iconsPath + 'dai.svg', valute: '', value: '1591037,6868'},
    {type: 'CRYPTO', name: 'Dai', image: this.iconsPath + 'dai.svg', valute: 'BEP-20', value:  '828665,8701'},
    {type: 'CRYPTO', name: 'Dash', image: this.iconsPath + 'dash.svg', valute: '', value: '5258,7467'},
    {type: 'CRYPTO', name: 'Decentraland', image: this.iconsPath + 'mana.svg', valute: '', value: '192548,0437'},
    {type: 'CRYPTO', name: 'Dogecoin', image: this.iconsPath + 'doge.svg', valute: '', value: '2068907,347'},
    {type: 'CRYPTO', name: 'Dogecoin', image: this.iconsPath + 'doge.svg', valute: 'BEP-20', value: '2068907,347'},
    {type: 'CRYPTO', name: 'EOS', image: this.iconsPath + 'eos.svg', valute: '', value: '2171548,5895'},
    {type: 'CRYPTO', name: 'EOS', image: this.iconsPath + 'eos.svg', valute: 'BEP-20', value: '2174458,5895'},
    {type: 'CRYPTO', name: 'Ether Classic', image: this.iconsPath + 'etc.svg', valute: '', value: '180634,2389'},
    {type: 'CRYPTO', name: 'Ether Classic', image: this.iconsPath + 'etc.svg', valute: 'BEP-20', value: '180545,5513'},
    {type: 'CRYPTO', name: 'Ethereum', image: this.iconsPath + 'eth.svg', valute: '', value: '7298,8209'},
    {type: 'CRYPTO', name: 'Ethereum', image: this.iconsPath + 'eth.svg', valute: 'BEP-20', value: '7507,9529'}, 
    {type: 'CRYPTO', name: 'EthereumPoW', image: this.iconsPath + 'ethw.svg', valute: '', value: '20000'},
    {type: 'CRYPTO', name: 'Litecoin', image: this.iconsPath + 'ltc.svg', valute: '', value: '70358,7356'},
    {type: 'CRYPTO', name: 'Litecoin', image: this.iconsPath + 'ltc.svg', valute: 'BEP-20', value: '47521,5463'},
    {type: 'CRYPTO', name: 'Monero', image: this.iconsPath + 'xmr.svg', valute: '', value: '70199,7857'},
    {type: 'CRYPTO', name: 'NEAR Protocol', image: this.iconsPath + 'near.svg', valute: '', value: '18273,4269'},
    {type: 'CRYPTO', name: 'Paxos', image: this.iconsPath + 'pax.svg', valute: '', value: '577126,4584'},
    {type: 'CRYPTO', name: 'Payer', image: this.iconsPath + 'payeer.svg', valute: 'EUR', value: '72721,72'},
    {type: 'CRYPTO', name: 'Payer', image: this.iconsPath + 'payeer.svg', valute: 'RUB', value: '7018048,63'}, 
    {type: 'CRYPTO', name: 'Payer', image: this.iconsPath + 'payeer.svg', valute: 'USD', value: '50444,39'},
    {type: 'DeFi', name: 'Polkadot  ', image: this.iconsPath + 'dot.svg', valute: '', value: '69312,1991'},
    {type: 'CRYPTO', name: 'Polkadot  ', image: this.iconsPath + 'dot.svg', valute: 'BEP-20', value: '93067,2147'},
    {type: 'CRYPTO', name: 'Polygon', image: this.iconsPath + 'matic.svg', valute: '', value: '132427,5193'},
    {type: 'CRYPTO', name: 'Polygon', image: this.iconsPath + 'matic.svg', valute: 'BEP-20', value: '107392,8311'},
    {type: 'CRYPTO', name: 'Qiwi', image: this.iconsPath + 'qwrub.svg', valute: '', value: '3234242,27'},
    {type: 'CRYPTO', name: 'Qtum', image: this.iconsPath + 'qtum.svg', valute: '', value: '27481,0825'},
    {type: 'CRYPTO', name: 'Raiffeisen Bank', image: this.iconsPath +  'raiffeisen.svg', valute: '', value: '2989566,84'},
    {type: 'DeFi', name: 'Ravencoin', image: this.iconsPath + 'rvn.svg', valute: '', value: '1251595,763'},
    {type: 'CRYPTO', name: 'Ripple', image: this.iconsPath + 'xrp.svg', valute: '', value: '815733,0099'},
    {type: 'CRYPTO', name: 'Ripple', image: this.iconsPath + 'xrp.svg', valute: 'BEP-20', value: '219851,195'},
    {type: 'CRYPTO', name: '', image: this.iconsPath +  'mir.svg', valute: 'RUB', value: '2805130,35'},
    {type: 'CRYPTO', name: 'Sberbank', image: this.iconsPath +  'sberbank.svg', valute: '', value: '3546530,02'},
    {type: 'CRYPTO', name: 'Shiba Inu', image: this.iconsPath + 'shib.svg', valute: '', value: '824780621815,7935'},
    {type: 'CRYPTO', name: 'Shiba Inu', image: this.iconsPath + 'shib.svg', valute: 'BEP-20', value: '821773511552,3556'},
    {type: 'CRYPTO', name: 'Solana', image: this.iconsPath + 'sol.svg', valute: '', value: '54146,1828'},
    {type: 'CRYPTO', name: 'Solana', image: this.iconsPath + 'sol.svg', valute: 'BEP-20', value: '49903,7573'},
    {type: 'CRYPTO', name: 'Stellar', image: this.iconsPath + 'xlm.svg', valute: '', value: '1964943,5033'},
    {type: 'CRYPTO', name: 'Stellar', image: this.iconsPath + 'xlm.svg', valute: 'BEP-20', value: '900000'},
    {type: 'CRYPTO', name: 'Terra', image: this.iconsPath + 'luna.svg', valute: '', value: '301693,1'},
    {type: 'CRYPTO', name: 'Terra Classic', image: this.iconsPath + 'lunc.svg', valute: '', value: '560269171,6'},
    {type: 'CRYPTO', name: 'Tether BEP-20', image: this.iconsPath + 'usdt.svg', valute: '', value: '1901053,1996'},
    {type: 'CRYPTO', name: 'Tether ERC-20', image: this.iconsPath + 'usdt.svg', valute: '', value: '840806,3123'},
    {type: 'CRYPTO', name: 'Tether Omni', image: this.iconsPath + 'usdt.svg', valute: '', value: '816411,3615'},
    {type: 'CRYPTO', name: 'Tether SPL', image: this.iconsPath + 'usdt.svg', valute: '', value: '1442388'},
    {type: 'CRYPTO', name: 'Tether TRC-20', image: this.iconsPath + 'usdt.svg', valute: '', value: '2962735,9908'},
    {type: 'CRYPTO', name: 'Tezos', image: this.iconsPath + 'xtz.svg', valute: '', value: '38509,3022'},
    {type: 'CRYPTO', name: 'Tezos', image: this.iconsPath + 'xtz.svg', valute: 'BEP-20', value: '15000'},
    {type: 'CRYPTO', name: 'Tinkoff', image: this.iconsPath +  'tinkoff.svg', valute: '', value: '2201724,62'},
    {type: 'CRYPTO', name: 'Toncoin', image: this.iconsPath + 'ton.svg', valute: '', value: '339115,9081'},
    {type: 'CRYPTO', name: 'TRON', image: this.iconsPath + 'trx.svg', valute: '', value: '5652832,4681'},
    {type: 'CRYPTO', name: 'TRON', image: this.iconsPath + 'trx.svg', valute: 'BEP-20', value: '3000000'},
    {type: 'CRYPTO', name: 'TrueUSD', image: this.iconsPath + 'tusd.svg', valute: '', value: '297601,3346'},
    {type: 'CRYPTO', name: 'TrueUSD', image: this.iconsPath + 'tusd.svg', valute: 'BEP-20', value: '285647,25'},
    {type: 'CRYPTO', name: 'Trust Wallet Token', image: this.iconsPath + 'twt.svg', valute: '', value: '46647'},
    {type: 'DeFi', name: 'Uniswap', image: this.iconsPath + 'uni.svg', valute: '', value: '49450,9497'},
    {type: 'CRYPTO', name: 'Uniswap', image: this.iconsPath + 'uni.svg', valute: '', value: '49450,9497'},
    {type: 'CRYPTO', name: 'USD Coin', image: this.iconsPath + 'usdc.svg', valute: '', value: '1939566,5381'},
    {type: 'CRYPTO', name: 'USD Coin', image: this.iconsPath + 'usdc.svg', valute: 'BEP-20', value: '2047832,8337'},
    {type: 'CRYPTO', name: 'VeChain', image: this.iconsPath + 'vet.svg', valute: '', value: '980758,2216'},
    {type: 'BANK', name: 'Visa/MasterCard', image: this.iconsPath +  'visamc.svg', valute: '', value: '2759548,94'},
    {type: 'BANK', name: 'VTB', image: this.iconsPath +  'vtb.svg', valute: '', value: '3534663,12'},
    {type: 'BANK', name: 'Waves', image: this.iconsPath + 'waves.svg', valute: '', value: '196760,9473'},
    {type: 'BANK', name: 'Wrapped Bitcoin', image: this.iconsPath + 'wbtc.svg', valute: '', value: '26,5407'},
    {type: 'BANK', name: 'Yearn.finance', image: this.iconsPath + 'yfi.svg', valute: '', value: '32,4337'},
    {type: 'BANK', name: 'Yearn.finance', image: this.iconsPath + 'yfi.svg', valute: 'BEP-20', value: '32,4337'},
    {type: 'BANK', name: 'Zcash', image: this.iconsPath + 'zec.svg', valute: '', value: '6323,5673'},
    {type: 'BANK', name: 'Zcash', image: this.iconsPath + 'zec.svg', valute: 'BEP-20', value: '3250'},
    {type: 'BANK', name: 'Виртуальная карта', image: this.iconsPath +  'bankcard.svg', valute: '', value: '3500000'},
    {type: 'BANK', name: 'Газпромбанк', image: this.iconsPath +  'gpb.svg', valute: '', value: '2690724,17'},
    {type: 'BANK', name: 'Кукуруза', image: this.iconsPath +  'kuk.svg', valute: '', value: '2911936,34'},
    {type: 'BANK', name: 'Открытие', image: this.iconsPath +  'openbank.svg', valute: '', value: '2877868,54'},
    {type: 'BANK', name: 'Почта Банк', image: this.iconsPath +  'pochtabank.svg', valute: '', value: '2697933,17'},
    {type: 'BANK', name: 'Росбанк', image: this.iconsPath +  'ros.svg', valute: '', value: '2835965,11'},
    {type: 'BANK', name: 'Русский Стандарт', image: this.iconsPath +  'russt.svg', valute: '', value: '2905024,07'},
    {type: 'BANK', name: 'Яндекс.Деньги', image: this.iconsPath +  'yamoney.svg', valute: '', value: '4915950,88'},
  ]

  constructor() { }

  public getCards(){
    return this.cards;
  }

  public getCryptos(){
    return this.cryptos;
  }

  public getChanged(){
    return this.changed;
  }


}
