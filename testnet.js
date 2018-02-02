const Btc = require('bitcoinjs-lib');
const TestNet = Btc.networks.testnet;
const request = require('request');

let keyPair = Btc.ECPair.makeRandom({ network: TestNet });
let publicKey = keyPair.getAddress();
let privateKey = keyPair.toWIF();

console.log(`Public: ${publicKey} \nPrivate: ${privateKey}`);

// let privKey = 'cTSy1TLbc4wTEYCk765DD8HETq8eWb3KzGjKGbDXWTTGUSGs6xj5';
// let ourWallet = new Btc.ECPair.fromWIF(privKey, TestNet);
let ourWallet = new Btc.ECPair.fromWIF(privateKey, TestNet);
console.log("ourWallet public key:", ourWallet.getAddress());

//let addr = 'mqVKYrNJcMkdK2QHFNEd1P6Qfc1Sqs3hu1'
let apiUrl = 'https://testnet.blockexplorer.com/api/addr/'

// log unspent transactions
request.get(apiUrl + publicKey + '/utxo', (err, req, body) => {
  console.log(JSON.parse(body))
});

// log balance
request.get(apiUrl + publicKey + '/balance', (err, req, body) => {
  console.log(JSON.parse(body))
});
