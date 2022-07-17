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
import { ec } from 'elliptic'
import { toBech32, toHex, fromBech32, fromHex } from '@cosmjs/encoding'
import {
  DirectSecp256k1HdWallet,
  DirectSecp256k1Wallet,
  makeCosmoshubPath,
} from '@cosmjs/proto-signing'

const bip39 = require('bip39')
const bip32 = require('bip32')

/**
 * On Cosmos, Juno, ... IBC chains
 * Except Terra chain
 */

async function get_private_public_key_from_seed_cosmos() {
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
    prefix: 'cosmos',
  })
  const accs1 = await wallet1.getAccounts()
  accs1.map((acc) => console.log(acc.address))
}

get_private_public_key_from_seed_cosmos()

/**
 * Didn't complete!!
 */

async function get_private_public_key_from_seed_terra() {
  const defaultMnemonic =
    'bright light parade capable hood chase all royal traffic asthma insect above audit toddler fancy allow reveal brick decide element knee soccer strategy flush'

  let mn = new EnglishMnemonic(defaultMnemonic)
  console.log(toHex(await Bip39.mnemonicToSeed(mn)))
}

// get_private_public_key_from_seed_terra()
