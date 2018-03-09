const request = require('request');
const proxiedRequest = request.defaults({proxy: "http://localhost:3128"});
const Btc = require('bitcoinjs-lib');
const TestNet = Btc.networks.testnet;
const apiUrl = 'https://testnet.blockexplorer.com/api/addr/';

let privateKey = 'cPVrtDvhfwKNq4GN3hvmm8CHhvjKViXyeERX6JeQ7UGUVGw1k4Zg';
let ourWallet = new Btc.ECPair.fromWIF(privateKey, TestNet);
let publicKey = ourWallet.getAddress();
console.log("ourWallet public key:", publicKey);

// log transactions
proxiedRequest.get(apiUrl + publicKey + '/utxo', (err, req, body) => {
    // console.log(JSON.parse(body));
    let response = JSON.parse(body);
    console.log('Unspent transactions: ', response);
});

let tx = new Btc.TransactionBuilder(TestNet);

let amountWeHave = 90000000; // 1.0 BTC
let amountToKeep = 50000000; // 0.9 BTC
let transactionFee = 1000; // 0.0001 BTC
let amountToSend = amountWeHave - amountToKeep - transactionFee; // ~0.1 (0.0999)

tx.addInput('0448149fad220e7a9b9d223d8cc2e2f8c4bbf547278f3311169b9715758c83d9', 0);

// Address Bitcoin Core: mpns2b5a74asdiQP9wdx7bLmgqastegu3W
// Address Copay: mkrw59j2wERjWhq5NGKbnrgkvMrp1TzkWT

tx.addOutput('mpns2b5a74asdiQP9wdx7bLmgqastegu3W', amountToSend);
tx.addOutput(publicKey, amountToKeep);
tx.sign(0, ourWallet);

let tx_hex = tx.build().toHex();

console.log('our beautiful transaction: ', tx_hex);

proxiedRequest.post({
    url:'https://testnet.blockexplorer.com/api/tx/send',
    form: {rawtx: tx_hex}
}, (error, httpResponse, body) => {
    console.log('error', error);
    console.log('body', body);
});