import { Component } from '@angular/core';
import { ChangeI } from 'src/app/interfaces/changeI';
import { CryptoI } from 'src/app/interfaces/cryptoI';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent {

  private iconsPath: string = 'assets/icons/'

  cryptos: CryptoI[] = [
    {name: 'AdvCash', imageSrc: this.iconsPath + 'adv.svg'},
    {name: 'Avalanche', imageSrc: this.iconsPath + 'avax.svg'},
    {name: 'Algorand', imageSrc: this.iconsPath + 'algo.svg'},
    {name: 'Binance Coin', imageSrc: this.iconsPath + 'bnb.svg'},
    {name: 'Binance USD', imageSrc: this.iconsPath + 'busd.svg'},
    {name: 'Bitcoin', imageSrc: this.iconsPath + 'btc.svg'},
    {name: 'Bitcoin Cash', imageSrc: this.iconsPath + 'bch.svg'},
    {name: 'Bitcoin Gold', imageSrc: this.iconsPath + 'btg.svg'},
    {name: 'Bitcoin SV', imageSrc: this.iconsPath + 'bsv.svg'},
    {name: 'Bitcoin без AML', imageSrc: this.iconsPath + 'btc.svg'},
    {name: 'Cardano', imageSrc: this.iconsPath + 'ada.svg'},
    {name: 'ChainLink', imageSrc: this.iconsPath + 'link.svg'},
    {name: 'Cosmos', imageSrc: this.iconsPath + 'atom.svg'},
    {name: 'Cronos', imageSrc: this.iconsPath + 'cro.svg'},
    {name: 'Dai', imageSrc: this.iconsPath + 'dai.svg'},
    {name: 'Dash', imageSrc: this.iconsPath + 'dash.svg'},
    {name: 'Decentraland', imageSrc: this.iconsPath + 'mana.svg'},
    {name: 'Dogecoin', imageSrc: this.iconsPath + 'doge.svg'},
    {name: 'EOS', imageSrc: this.iconsPath + 'eos.svg'},
    {name: 'Ether Classic', imageSrc: this.iconsPath + 'etc.svg'},
    {name: 'Ethereum', imageSrc: this.iconsPath + 'eth.svg'},
    {name: 'EthereumPoW', imageSrc: this.iconsPath + 'ethw.svg'},
    {name: 'Litecoin', imageSrc: this.iconsPath + 'ltc.svg'},
    {name: 'Monero', imageSrc: this.iconsPath + 'xmr.svg'},
    {name: 'NEAR Protocol', imageSrc: this.iconsPath + 'near.svg'},
    {name: 'Paxos', imageSrc: this.iconsPath + 'pax.svg'},
    {name: 'Polkadot  ', imageSrc: this.iconsPath + 'dot.svg'},
    {name: 'Polygon', imageSrc: this.iconsPath + 'matic.svg'},
    {name: 'Qtum', imageSrc: this.iconsPath + 'qtum.svg'},
    {name: 'Ravencoin', imageSrc: this.iconsPath + 'rvn.svg'},
    {name: 'Ripple', imageSrc: this.iconsPath + 'xrp.svg'},
    {name: 'Ravencoin', imageSrc: this.iconsPath + 'rvn.svg'},
    {name: 'Shiba Inu', imageSrc: this.iconsPath + 'shib.svg'},
    {name: 'Solana', imageSrc: this.iconsPath + 'sol.svg'},
    {name: 'Stellar', imageSrc: this.iconsPath + 'xlm.svg'},
    {name: 'Terra', imageSrc: this.iconsPath + 'luna.svg'},
    {name: 'Terra Classic', imageSrc: this.iconsPath + 'lunc.svg'},
    {name: 'Tether BEP-20', imageSrc: this.iconsPath + 'usdt.svg'},
    {name: 'Tether ERC-20', imageSrc: this.iconsPath + 'usdt.svg'},
    {name: 'Tether Omni', imageSrc: this.iconsPath + 'usdt.svg'},
    {name: 'Tether SPL', imageSrc: this.iconsPath + 'usdt.svg'},
    {name: 'Tether TRC-20', imageSrc: this.iconsPath + 'usdt.svg'},
    {name: 'Tezos', imageSrc: this.iconsPath + 'xtz.svg'},
    {name: 'Toncoin', imageSrc: this.iconsPath + 'ton.svg'},
    {name: 'TRON', imageSrc: this.iconsPath + 'trx.svg'},
    {name: 'TrueUSD', imageSrc: this.iconsPath + 'tusd.svg'},
    {name: 'Trust Wallet Token', imageSrc: this.iconsPath + 'twt.svg'},
    {name: 'Uniswap', imageSrc: this.iconsPath + 'uni.svg'},
    {name: 'USD Coin', imageSrc: this.iconsPath + 'usdc.svg'},
    {name: 'VeChain', imageSrc: this.iconsPath + 'vet.svg'},
    {name: 'Waves', imageSrc: this.iconsPath + 'waves.svg'},
    {name: 'Wrapped Bitcoin', imageSrc: this.iconsPath + 'wbtc.svg'},
    {name: 'Yearn.finance', imageSrc: this.iconsPath + 'yfi.svg'},
    {name: 'Zcash', imageSrc: this.iconsPath + 'zec.svg'}
];

  changed: Array<ChangeI | CryptoI> = [
    ...this.cryptos,
    {name: '', imageSrc: ''}
  ]

    selectedCrypto: CryptoI | null = null;
    selectedChanged: ChangeI | CryptoI | null = null;
}
