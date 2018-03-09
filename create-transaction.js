const request = require('request');
const Btc = require('bitcoinjs-lib');
const TestNet = Btc.networks.testnet;
const apiUrl = 'https://testnet.blockexplorer.com/api/addr/';

var privateKey = 'cPVrtDvhfwKNq4GN3hvmm8CHhvjKViXyeERX6JeQ7UGUVGw1k4Zg';
var ourWallet = new Btc.ECPair.fromWIF(privateKey, TestNet);
var publicKey = ourWallet.getAddress();
console.log("ourWallet public key:", publicKey);

// log unspent transactions
request.get(apiUrl + publicKey + '/utxo', (err, req, body) => {
    var response = JSON.parse(body);
    console.log('Unspent transactions:', response);
});

var tx = new Btc.TransactionBuilder(TestNet);

var amountWeHave = 100000000; // 1.0 BTC
var amountToKeep = 90000000; // 0.9 BTC
var transactionFee = 1000; // 0.0001 BTC
var amountToSend = amountWeHave - amountToKeep - transactionFee; // ~0.1 (0.0999)

console.log('Amount to send:', amountToSend);
// tx.addInput('e4180bcd80c417173a47a98c38d8d04d0a14739040dafa074b5cd160b61bd391', 1);

// // Address Bitcoin Core: mpns2b5a74asdiQP9wdx7bLmgqastegu3W
// // Address Copay: mkrw59j2wERjWhq5NGKbnrgkvMrp1TzkWT

// tx.addOutput('mpns2b5a74asdiQP9wdx7bLmgqastegu3W', amountToSend);
// tx.addOutput(publicKey, amountToKeep);
// tx.sign(0, ourWallet);

// var tx_hex = tx.build().toHex();

// console.log('our beautiful transaction: ', tx_hex);

// request.post({
//     url:'https://testnet.blockexplorer.com/api/tx/send',
//     form: {rawtx: tx_hex}
// }, (error, httpResponse, body) => {
//     console.log('error', error);
//     console.log('body', body);
// });