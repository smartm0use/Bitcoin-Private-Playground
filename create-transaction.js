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
proxiedRequest.get(apiUrl + publicKey, (err, req, body) => {
    // console.log(JSON.parse(body));
    let response = JSON.parse(body);
    console.log('Transactions: ', response['transactions']);
});

let tx = new Btc.TransactionBuilder(TestNet);

let amountWeHave = 100000000; // 1.0 BTC
let amountToKeep = 90000000; // 0.9 BTC
let transactionFee = 1000; // 0.0001 BTC
let amountToSend = amountWeHave - amountToKeep - transactionFee; // ~0.1 (0.9999)

tx.addInput('f1ab15322553e82a54273fe14d38163113fed62e0904d9386dc320bc6a8fb4f3', 0);

tx.addOutput('mkrw59j2wERjWhq5NGKbnrgkvMrp1TzkWT', amountToSend);
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