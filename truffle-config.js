const HDWalletProvider = require('@truffle/hdwallet-provider')
const mnemonic = 'clip shop record armed fat deposit atom stay waste lift shuffle nurse'

const privateKeys = process.env.PRIVATE_KEYS || ""

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777" // Match ganache network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
            mnemoic, // Array of account private keys
            `https://ropsten.infura.io/v3/4327f4c245a7481a80cdaa739950b1f7` // Url to an Ethereum Node
        )
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 3
    }
  },
  //contracts_directory: './src/contracts/',
  //contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};