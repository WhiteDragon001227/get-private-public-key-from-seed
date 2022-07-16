import {
  Bip39,
  EnglishMnemonic,
  HdPath,
  Secp256k1,
  Secp256k1Keypair,
  Slip10,
  Slip10Curve,
  stringToPath,
} from '@cosmjs/crypto'
import { toBech32, toHex, fromBech32, fromHex } from '@cosmjs/encoding'
import {
  DirectSecp256k1HdWallet,
  DirectSecp256k1Wallet,
  makeCosmoshubPath,
} from '@cosmjs/proto-signing'

const bip39 = require('bip39')
const bip32 = require('bip32')

async function main() {
  const defaultMnemonic =
    'bright light parade capable hood chase all royal traffic asthma insect above audit toddler fancy allow reveal brick decide element knee soccer strategy flush'
  const path: string = `m/44'/118'/0'/0/0`
  const password: string = ''

  const seed = bip39.mnemonicToSeedSync(defaultMnemonic, password)
  console.log('seed', toHex(seed))
  const masterSeed = bip32.fromSeed(seed)
  const hd = masterSeed.derivePath(path)

  const privateKey = hd.privateKey
  if (!privateKey) {
    throw new Error('null hd key')
  }
  console.log('privatekey', toHex(privateKey))

  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(defaultMnemonic, {
    prefix: 'juno',
  })
  const accs = await wallet.getAccounts()
  accs.map((acc) => console.log(acc.address))

  const wallet1 = await DirectSecp256k1HdWallet.fromMnemonic(defaultMnemonic, {
    prefix: 'terra',
  })
  const accs1 = await wallet1.getAccounts()
  accs1.map((acc) => console.log(acc.address))

  // let mn = new EnglishMnemonic(defaultMnemonic)
  // console.log(toHex(await Bip39.mnemonicToSeed(mn)))
  // const masterSeed = bip32.fromSeed(seed);

  // console.log(JSON.stringify(accs))
  //   const seed = await getKeyPair(myHdPath, await wallet.serialize({algorithm: "Secp256k1"}));
  //   console.log(toHex(seed.privkey));
}

main()

// spy cruise floor tip silver project invite half they hazard forum globe country patrol furnace bleak tower multiply fit news boy disagree fish choice
// terra1jjr37mea3tvj6s547nxuxc96sazlz2nndlev50

// animal weather fancy credit place riot hip memory initial cabin filter sight boat holiday erode bamboo forget glare weasel clean between road liberty moon
// juno155vkuxmzvu7raz7wphfzczj4yqm7pkx8797haq
// 5c2bcaeb990cc3a0e93f7bd3fbb1fd7fb78f97f641cfa02481e19235ccf42ff3

/**
 * bright light parade capable hood chase all royal traffic asthma insect above audit toddler fancy allow reveal brick decide element knee soccer strategy flush
 * 
 */