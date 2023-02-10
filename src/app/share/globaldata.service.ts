import { Injectable } from '@angular/core';
import { CardI } from '../interfaces/cardI';
import { ChangeI } from '../interfaces/changeI';
import { CryptoI } from '../interfaces/cryptoI';

@Injectable({
  providedIn: 'root'
})
export class GlobaldataService {

  private iconsPath: string = 'assets/icons/';

  cryptos: CryptoI[] = [
    {type: 'CRYPTO', name: 'AdvCash', imageSrc: this.iconsPath + 'adv.svg'},
    {type: 'CRYPTO', name: 'Avalanche', imageSrc: this.iconsPath + 'avax.svg'},
    {type: 'CRYPTO', name: 'Algorand', imageSrc: this.iconsPath + 'algo.svg'},
    {type: 'CRYPTO', name: 'Binance Coin', imageSrc: this.iconsPath + 'bnb.svg'},
    {type: 'CRYPTO', name: 'Binance USD', imageSrc: this.iconsPath + 'busd.svg'},
    {index: 'BTC', type: 'CRYPTO', name: 'Bitcoin', imageSrc: this.iconsPath + 'btc.svg'},
    {type: 'CRYPTO', name: 'Bitcoin Cash', imageSrc: this.iconsPath + 'bch.svg'},
    {type: 'CRYPTO', name: 'Bitcoin Gold', imageSrc: this.iconsPath + 'btg.svg'},
    {type: 'CRYPTO', name: 'Bitcoin SV', imageSrc: this.iconsPath + 'bsv.svg'},
    {type: 'CRYPTO', name: 'Bitcoin без AML', imageSrc: this.iconsPath + 'btc.svg'},
    {index: 'ADA', type: 'CRYPTO', name: 'Cardano', imageSrc: this.iconsPath + 'ada.svg'},
    {type: 'DeFi', name: 'ChainLink', imageSrc: this.iconsPath + 'link.svg'},
    {type: 'CRYPTO', name: 'Cosmos', imageSrc: this.iconsPath + 'atom.svg'},
    {type: 'CRYPTO', name: 'Cronos', imageSrc: this.iconsPath + 'cro.svg'},
    {type: 'DeFi', name: 'Dai', imageSrc: this.iconsPath + 'dai.svg'},
    {index: 'DASH', type: 'CRYPTO', name: 'Dash', imageSrc: this.iconsPath + 'dash.svg'},
    {type: 'CRYPTO', name: 'Decentraland', imageSrc: this.iconsPath + 'mana.svg'},
    {index: 'DOGE', type: 'CRYPTO', name: 'Dogecoin', imageSrc: this.iconsPath + 'doge.svg'},
    {type: 'CRYPTO', name: 'EOS', imageSrc: this.iconsPath + 'eos.svg'},
    {type: 'CRYPTO', name: 'Ether Classic', imageSrc: this.iconsPath + 'etc.svg'},
    {type: 'CRYPTO', name: 'Ethereum', imageSrc: this.iconsPath + 'eth.svg'},
    {type: 'CRYPTO', name: 'EthereumPoW', imageSrc: this.iconsPath + 'ethw.svg'},
    {index: 'LTC', type: 'CRYPTO', name: 'Litecoin', imageSrc: this.iconsPath + 'ltc.svg'},
    {index: 'XMR', type: 'CRYPTO', name: 'Monero', imageSrc: this.iconsPath + 'xmr.svg'},
    {type: 'CRYPTO', name: 'NEAR Protocol', imageSrc: this.iconsPath + 'near.svg'},
    {type: 'CRYPTO', name: 'Paxos', imageSrc: this.iconsPath + 'pax.svg'},
    {type: 'DeFi', name: 'Polkadot  ', imageSrc: this.iconsPath + 'dot.svg'},
    {type: 'CRYPTO', name: 'Polygon', imageSrc: this.iconsPath + 'matic.svg'},
    {type: 'CRYPTO', name: 'Qtum', imageSrc: this.iconsPath + 'qtum.svg'},
    {type: 'DeFi', name: 'Ravencoin', imageSrc: this.iconsPath + 'rvn.svg'},
    {index: 'XRP', type: 'CRYPTO', name: 'Ripple', imageSrc: this.iconsPath + 'xrp.svg'},
    {type: 'CRYPTO', name: 'Shiba Inu', imageSrc: this.iconsPath + 'shib.svg'},
    {type: 'CRYPTO', name: 'Solana', imageSrc: this.iconsPath + 'sol.svg'},
    {type: 'CRYPTO', name: 'Stellar', imageSrc: this.iconsPath + 'xlm.svg'},
    {type: 'CRYPTO', name: 'Terra', imageSrc: this.iconsPath + 'luna.svg'},
    {type: 'CRYPTO', name: 'Terra Classic', imageSrc: this.iconsPath + 'lunc.svg'},
    {index: 'USDT', type: 'CRYPTO', name: 'Tether BEP-20', imageSrc: this.iconsPath + 'usdt.svg'},
    {index: 'USDT', type: 'CRYPTO', name: 'Tether ERC-20', imageSrc: this.iconsPath + 'usdt.svg'},
    {index: 'USDT', type: 'CRYPTO', name: 'Tether Omni', imageSrc: this.iconsPath + 'usdt.svg'},
    {index: 'USDT', type: 'CRYPTO', name: 'Tether SPL', imageSrc: this.iconsPath + 'usdt.svg'},
    {index: 'USDT', type: 'CRYPTO', name: 'Tether TRC-20', imageSrc: this.iconsPath + 'usdt.svg'},
    {type: 'CRYPTO', name: 'Tezos', imageSrc: this.iconsPath + 'xtz.svg'},
    {type: 'CRYPTO', name: 'Toncoin', imageSrc: this.iconsPath + 'ton.svg'},
    {index: 'TRX', type: 'CRYPTO', name: 'TRON', imageSrc: this.iconsPath + 'trx.svg'},
    {type: 'CRYPTO', name: 'TrueUSD', imageSrc: this.iconsPath + 'tusd.svg'},
    {type: 'CRYPTO', name: 'Trust Wallet Token', imageSrc: this.iconsPath + 'twt.svg'},
    {type: 'DeFi', name: 'Uniswap', imageSrc: this.iconsPath + 'uni.svg'},
    {type: 'CRYPTO', name: 'USD Coin', imageSrc: this.iconsPath + 'usdc.svg'},
    {type: 'CRYPTO', name: 'VeChain', imageSrc: this.iconsPath + 'vet.svg'},
    {type: 'CRYPTO', name: 'Waves', imageSrc: this.iconsPath + 'waves.svg'},
    {type: 'CRYPTO', name: 'Wrapped Bitcoin', imageSrc: this.iconsPath + 'wbtc.svg'},
    {type: 'CRYPTO', name: 'Yearn.finance', imageSrc: this.iconsPath + 'yfi.svg'},
    {index: 'ZEC', type: 'CRYPTO', name: 'Zcash', imageSrc: this.iconsPath + 'zec.svg'}
];


  private changed: Array<ChangeI | CryptoI> = [
    ...this.cryptos,
    {index: 'RUB',type: 'BANK', name: 'Alfa Bank', imageSrc: this.iconsPath + 'alfa_bank.svg'},
    {index: 'RUB',type: 'BANK', name: 'Raiffeisen Bank', imageSrc: this.iconsPath +  'raiffeisen.svg'},
    {index: 'RUB',type: 'BANK', name: 'МИР', imageSrc: this.iconsPath +  'mir.svg'},
    {index: 'RUB',type: 'BANK', name: 'Sberbank', imageSrc: this.iconsPath +  'sberbank.svg'},
    {index: 'RUB',type: 'BANK', name: 'Tinkoff', imageSrc: this.iconsPath +  'tinkoff.svg'},
    {index: 'RUB',type: 'BANK', name: 'Tinkoff QR-коды', imageSrc: this.iconsPath +  'tinkoff.svg'},
    {index: 'RUB',type: 'BANK', name: 'Visa/MasterCard', imageSrc: this.iconsPath +  'visamc.svg'},
    {index: 'RUB',type: 'BANK', name: 'VTB', imageSrc: this.iconsPath +  'vtb.svg'},
    {index: 'RUB',type: 'BANK', name: 'Ак Барс', imageSrc: this.iconsPath +  'akbrub.svg'},
    {index: 'RUB',type: 'BANK', name: 'Payer', imageSrc: this.iconsPath + 'payeer.svg'},
    {index: 'RUB',type: 'BANK', name: 'Qiwi', imageSrc: this.iconsPath + 'qwrub.svg'},
    {index: 'RUB',type: 'BANK', name: 'Виртуальная карта', imageSrc: this.iconsPath +  'bankcard.svg'},
    {index: 'RUB',type: 'BANK', name: 'Газпромбанк', imageSrc: this.iconsPath +  'gpb.svg'},
    {index: 'RUB',type: 'BANK', name: 'Кукуруза', imageSrc: this.iconsPath +  'kuk.svg'},
    {index: 'RUB',type: 'BANK', name: 'Открытие', imageSrc: this.iconsPath +  'openbank.svg'},
    {index: 'RUB',type: 'BANK', name: 'Почта Банк', imageSrc: this.iconsPath +  'pochtabank.svg'},
    {index: 'RUB',type: 'BANK', name: 'Росбанк', imageSrc: this.iconsPath +  'ros.svg'},
    {index: 'RUB',type: 'BANK', name: 'Русский Стандарт', imageSrc: this.iconsPath +  'russt.svg'},
    {index: 'RUB',type: 'BANK', name: 'Яндекс.Деньги', imageSrc: this.iconsPath +  'yamoney.svg'},
    {index: 'RUB',type: 'BANK', name: 'Home Bank', imageSrc: this.iconsPath + 'homebank.svg'},
  ]

  private cards: CardI[] = [
    {type: 'CRYPTO', name: 'AdvCash', imageSrc: this.iconsPath + 'adv.svg', valute: 'EUR', value: '39588,78'},
    {type: 'CRYPTO', name: 'AdvCash', imageSrc: this.iconsPath + 'adv.svg', valute: 'RUB', value: '3741073,82'},
    {type: 'CRYPTO', name: 'AdvCash', imageSrc: this.iconsPath + 'adv.svg', valute: 'RUB', value: '3741073,82'},
    {type: 'BANK', name: 'Alfa Bank', imageSrc: this.iconsPath + 'alfa_bank.svg', valute: '', value: '2931365,17'},
    {type: 'CRYPTO', name: 'Algorand', imageSrc: this.iconsPath + 'algo.svg', valute: '', value: '199661,8213'},
    {type: 'CRYPTO', name: 'Avalanche', imageSrc: this.iconsPath + 'avax.svg', valute: '', value: '58756,3622'},
    {type: 'CRYPTO', name: 'Avalanche', imageSrc: this.iconsPath + 'avax.svg', valute: 'BEP-20', value: '58756,3622'},
    {type: 'CRYPTO', name: 'Binance Coin', imageSrc: this.iconsPath + 'bnb.svg', valute: '', value: '13674,7406'},
    {type: 'CRYPTO', name: 'Binance Coin', imageSrc: this.iconsPath + 'bnb.svg', valute: 'BEP-20', value: '13724,7358'},
    {type: 'CRYPTO', name: 'Binance USD', imageSrc: this.iconsPath + 'busd.svg', valute: '', value: '3075716'},
    {type: 'CRYPTO', name: 'Binance USD', imageSrc: this.iconsPath + 'busd.svg', valute: 'BEP-20', value: '3122751,3756'},
    {type: 'CRYPTO', name: 'Bitcoin', imageSrc: this.iconsPath + 'btc.svg', valute: '', value: '37,2305'},
    {type: 'CRYPTO', name: 'Bitcoin', imageSrc: this.iconsPath + 'btc.svg', valute: 'BEP-20', value: '65,1095'},
    {type: 'CRYPTO', name: 'Bitcoin Cash', imageSrc: this.iconsPath + 'bch.svg', valute: '', value: '3152,7883'},
    {type: 'CRYPTO', name: 'Bitcoin Cash', imageSrc: this.iconsPath + 'bch.svg', valute: 'BEP-20', value: '2350'},
    {type: 'CRYPTO', name: 'Bitcoin Gold', imageSrc: this.iconsPath + 'btg.svg', valute: '', value: '15008,9455'},
    {type: 'CRYPTO', name: 'Bitcoin SV', imageSrc: this.iconsPath + 'bsv.svg', valute: 'SV', value: '17476,3444'},
    {type: 'CRYPTO', name: 'Bitcoin без AML', imageSrc: this.iconsPath + 'btc.svg', valute: '', value: '57,9798'},
    {type: 'CRYPTO', name: 'Cardano', imageSrc: this.iconsPath + 'ada.svg', valute: '', value: '7276533,7574'},
    {type: 'CRYPTO', name: 'Cardano', imageSrc: this.iconsPath + 'ada.svg', valute: 'BEP-20', value: '7276533,7574'},
    {type: 'DeFi', name: 'ChainLink', imageSrc: this.iconsPath + 'link.svg', valute: '', value: '23005,0229'},
    {type: 'CRYPTO', name: 'ChainLink', imageSrc: this.iconsPath + 'link.svg', valute: 'BEP-20', value: '23005,0229'},
    {type: 'CRYPTO', name: 'Cosmos', imageSrc: this.iconsPath + 'atom.svg', valute: '', value: '372906,7112'},
    {type: 'CRYPTO', name: 'Cronos', imageSrc: this.iconsPath + 'cro.svg', valute: '', value: '998828,4483'},
    {type: 'DeFi', name: 'Dai', imageSrc: this.iconsPath + 'dai.svg', valute: '', value: '1591037,6868'},
    {type: 'CRYPTO', name: 'Dai', imageSrc: this.iconsPath + 'dai.svg', valute: 'BEP-20', value:  '828665,8701'},
    {type: 'CRYPTO', name: 'Dash', imageSrc: this.iconsPath + 'dash.svg', valute: '', value: '5258,7467'},
    {type: 'CRYPTO', name: 'Decentraland', imageSrc: this.iconsPath + 'mana.svg', valute: '', value: '192548,0437'},
    {type: 'CRYPTO', name: 'Dogecoin', imageSrc: this.iconsPath + 'doge.svg', valute: '', value: '2068907,347'},
    {type: 'CRYPTO', name: 'Dogecoin', imageSrc: this.iconsPath + 'doge.svg', valute: 'BEP-20', value: '2068907,347'},
    {type: 'CRYPTO', name: 'EOS', imageSrc: this.iconsPath + 'eos.svg', valute: '', value: '2171548,5895'},
    {type: 'CRYPTO', name: 'EOS', imageSrc: this.iconsPath + 'eos.svg', valute: 'BEP-20', value: '2174458,5895'},
    {type: 'CRYPTO', name: 'Ether Classic', imageSrc: this.iconsPath + 'etc.svg', valute: '', value: '180634,2389'},
    {type: 'CRYPTO', name: 'Ether Classic', imageSrc: this.iconsPath + 'etc.svg', valute: 'BEP-20', value: '180545,5513'},
    {type: 'CRYPTO', name: 'Ethereum', imageSrc: this.iconsPath + 'eth.svg', valute: '', value: '7298,8209'},
    {type: 'CRYPTO', name: 'Ethereum', imageSrc: this.iconsPath + 'eth.svg', valute: 'BEP-20', value: '7507,9529'}, 
    {type: 'CRYPTO', name: 'EthereumPoW', imageSrc: this.iconsPath + 'ethw.svg', valute: '', value: '20000'},
    {type: 'CRYPTO', name: 'Litecoin', imageSrc: this.iconsPath + 'ltc.svg', valute: '', value: '70358,7356'},
    {type: 'CRYPTO', name: 'Litecoin', imageSrc: this.iconsPath + 'ltc.svg', valute: 'BEP-20', value: '47521,5463'},
    {type: 'CRYPTO', name: 'Monero', imageSrc: this.iconsPath + 'xmr.svg', valute: '', value: '70199,7857'},
    {type: 'CRYPTO', name: 'NEAR Protocol', imageSrc: this.iconsPath + 'near.svg', valute: '', value: '18273,4269'},
    {type: 'CRYPTO', name: 'Paxos', imageSrc: this.iconsPath + 'pax.svg', valute: '', value: '577126,4584'},
    {type: 'CRYPTO', name: 'Payer', imageSrc: this.iconsPath + 'payeer.svg', valute: 'EUR', value: '72721,72'},
    {type: 'CRYPTO', name: 'Payer', imageSrc: this.iconsPath + 'payeer.svg', valute: 'RUB', value: '7018048,63'}, 
    {type: 'CRYPTO', name: 'Payer', imageSrc: this.iconsPath + 'payeer.svg', valute: 'USD', value: '50444,39'},
    {type: 'DeFi', name: 'Polkadot  ', imageSrc: this.iconsPath + 'dot.svg', valute: '', value: '69312,1991'},
    {type: 'CRYPTO', name: 'Polkadot  ', imageSrc: this.iconsPath + 'dot.svg', valute: 'BEP-20', value: '93067,2147'},
    {type: 'CRYPTO', name: 'Polygon', imageSrc: this.iconsPath + 'matic.svg', valute: '', value: '132427,5193'},
    {type: 'CRYPTO', name: 'Polygon', imageSrc: this.iconsPath + 'matic.svg', valute: 'BEP-20', value: '107392,8311'},
    {type: 'CRYPTO', name: 'Qiwi', imageSrc: this.iconsPath + 'qwrub.svg', valute: '', value: '3234242,27'},
    {type: 'CRYPTO', name: 'Qtum', imageSrc: this.iconsPath + 'qtum.svg', valute: '', value: '27481,0825'},
    {type: 'CRYPTO', name: 'Raiffeisen Bank', imageSrc: this.iconsPath +  'raiffeisen.svg', valute: '', value: '2989566,84'},
    {type: 'DeFi', name: 'Ravencoin', imageSrc: this.iconsPath + 'rvn.svg', valute: '', value: '1251595,763'},
    {type: 'CRYPTO', name: 'Ripple', imageSrc: this.iconsPath + 'xrp.svg', valute: '', value: '815733,0099'},
    {type: 'CRYPTO', name: 'Ripple', imageSrc: this.iconsPath + 'xrp.svg', valute: 'BEP-20', value: '219851,195'},
    {type: 'CRYPTO', name: '', imageSrc: this.iconsPath +  'mir.svg', valute: 'RUB', value: '2805130,35'},
    {type: 'CRYPTO', name: 'Sberbank', imageSrc: this.iconsPath +  'sberbank.svg', valute: '', value: '3546530,02'},
    {type: 'CRYPTO', name: 'Shiba Inu', imageSrc: this.iconsPath + 'shib.svg', valute: '', value: '824780621815,7935'},
    {type: 'CRYPTO', name: 'Shiba Inu', imageSrc: this.iconsPath + 'shib.svg', valute: 'BEP-20', value: '821773511552,3556'},
    {type: 'CRYPTO', name: 'Solana', imageSrc: this.iconsPath + 'sol.svg', valute: '', value: '54146,1828'},
    {type: 'CRYPTO', name: 'Solana', imageSrc: this.iconsPath + 'sol.svg', valute: 'BEP-20', value: '49903,7573'},
    {type: 'CRYPTO', name: 'Stellar', imageSrc: this.iconsPath + 'xlm.svg', valute: '', value: '1964943,5033'},
    {type: 'CRYPTO', name: 'Stellar', imageSrc: this.iconsPath + 'xlm.svg', valute: 'BEP-20', value: '900000'},
    {type: 'CRYPTO', name: 'Terra', imageSrc: this.iconsPath + 'luna.svg', valute: '', value: '301693,1'},
    {type: 'CRYPTO', name: 'Terra Classic', imageSrc: this.iconsPath + 'lunc.svg', valute: '', value: '560269171,6'},
    {type: 'CRYPTO', name: 'Tether BEP-20', imageSrc: this.iconsPath + 'usdt.svg', valute: '', value: '1901053,1996'},
    {type: 'CRYPTO', name: 'Tether ERC-20', imageSrc: this.iconsPath + 'usdt.svg', valute: '', value: '840806,3123'},
    {type: 'CRYPTO', name: 'Tether Omni', imageSrc: this.iconsPath + 'usdt.svg', valute: '', value: '816411,3615'},
    {type: 'CRYPTO', name: 'Tether SPL', imageSrc: this.iconsPath + 'usdt.svg', valute: '', value: '1442388'},
    {type: 'CRYPTO', name: 'Tether TRC-20', imageSrc: this.iconsPath + 'usdt.svg', valute: '', value: '2962735,9908'},
    {type: 'CRYPTO', name: 'Tezos', imageSrc: this.iconsPath + 'xtz.svg', valute: '', value: '38509,3022'},
    {type: 'CRYPTO', name: 'Tezos', imageSrc: this.iconsPath + 'xtz.svg', valute: 'BEP-20', value: '15000'},
    {type: 'CRYPTO', name: 'Tinkoff', imageSrc: this.iconsPath +  'tinkoff.svg', valute: '', value: '2201724,62'},
    {type: 'CRYPTO', name: 'Toncoin', imageSrc: this.iconsPath + 'ton.svg', valute: '', value: '339115,9081'},
    {type: 'CRYPTO', name: 'TRON', imageSrc: this.iconsPath + 'trx.svg', valute: '', value: '5652832,4681'},
    {type: 'CRYPTO', name: 'TRON', imageSrc: this.iconsPath + 'trx.svg', valute: 'BEP-20', value: '3000000'},
    {type: 'CRYPTO', name: 'TrueUSD', imageSrc: this.iconsPath + 'tusd.svg', valute: '', value: '297601,3346'},
    {type: 'CRYPTO', name: 'TrueUSD', imageSrc: this.iconsPath + 'tusd.svg', valute: 'BEP-20', value: '285647,25'},
    {type: 'CRYPTO', name: 'Trust Wallet Token', imageSrc: this.iconsPath + 'twt.svg', valute: '', value: '46647'},
    {type: 'DeFi', name: 'Uniswap', imageSrc: this.iconsPath + 'uni.svg', valute: '', value: '49450,9497'},
    {type: 'CRYPTO', name: 'Uniswap', imageSrc: this.iconsPath + 'uni.svg', valute: '', value: '49450,9497'},
    {type: 'CRYPTO', name: 'USD Coin', imageSrc: this.iconsPath + 'usdc.svg', valute: '', value: '1939566,5381'},
    {type: 'CRYPTO', name: 'USD Coin', imageSrc: this.iconsPath + 'usdc.svg', valute: 'BEP-20', value: '2047832,8337'},
    {type: 'CRYPTO', name: 'VeChain', imageSrc: this.iconsPath + 'vet.svg', valute: '', value: '980758,2216'},
    {type: 'BANK', name: 'Visa/MasterCard', imageSrc: this.iconsPath +  'visamc.svg', valute: '', value: '2759548,94'},
    {type: 'BANK', name: 'VTB', imageSrc: this.iconsPath +  'vtb.svg', valute: '', value: '3534663,12'},
    {type: 'BANK', name: 'Waves', imageSrc: this.iconsPath + 'waves.svg', valute: '', value: '196760,9473'},
    {type: 'BANK', name: 'Wrapped Bitcoin', imageSrc: this.iconsPath + 'wbtc.svg', valute: '', value: '26,5407'},
    {type: 'BANK', name: 'Yearn.finance', imageSrc: this.iconsPath + 'yfi.svg', valute: '', value: '32,4337'},
    {type: 'BANK', name: 'Yearn.finance', imageSrc: this.iconsPath + 'yfi.svg', valute: 'BEP-20', value: '32,4337'},
    {type: 'BANK', name: 'Zcash', imageSrc: this.iconsPath + 'zec.svg', valute: '', value: '6323,5673'},
    {type: 'BANK', name: 'Zcash', imageSrc: this.iconsPath + 'zec.svg', valute: 'BEP-20', value: '3250'},
    {type: 'BANK', name: 'Виртуальная карта', imageSrc: this.iconsPath +  'bankcard.svg', valute: '', value: '3500000'},
    {type: 'BANK', name: 'Газпромбанк', imageSrc: this.iconsPath +  'gpb.svg', valute: '', value: '2690724,17'},
    {type: 'BANK', name: 'Кукуруза', imageSrc: this.iconsPath +  'kuk.svg', valute: '', value: '2911936,34'},
    {type: 'BANK', name: 'Открытие', imageSrc: this.iconsPath +  'openbank.svg', valute: '', value: '2877868,54'},
    {type: 'BANK', name: 'Почта Банк', imageSrc: this.iconsPath +  'pochtabank.svg', valute: '', value: '2697933,17'},
    {type: 'BANK', name: 'Росбанк', imageSrc: this.iconsPath +  'ros.svg', valute: '', value: '2835965,11'},
    {type: 'BANK', name: 'Русский Стандарт', imageSrc: this.iconsPath +  'russt.svg', valute: '', value: '2905024,07'},
    {type: 'BANK', name: 'Яндекс.Деньги', imageSrc: this.iconsPath +  'yamoney.svg', valute: '', value: '4915950,88'},
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
