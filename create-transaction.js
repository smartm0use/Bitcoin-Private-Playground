const request = require('request');
const Btc = require('bitcoinjs-lib');
const TestNet = Btc.networks.testnet;
const apiUrl = 'https://testnet.blockexplorer.com/api/addr/';

var privateKey = 'cPVrtDvhfwKNq4GN3hvmm8CHhvjKViXyeERX6JeQ7UGUVGw1k4Zg';
var keyPair = new Btc.ECPair.fromWIF(privateKey, TestNet);
var address = keyPair.getAddress();
console.log("Indirizzo:", address);

// log unspent transactions
request.get(apiUrl + address + '/utxo', (err, req, body) => {
    var response = JSON.parse(body);
console.log('Lista transazioni non spese:', response);
});

// var amountWeHave = 100000000; // 1.0 BTC
// var amountToKeep = 90000000; // 0.9 BTC
// var transactionFee = 1000; // 0.0001 BTC
// var amountToSend = amountWeHave - amountToKeep - transactionFee; // ~0.1 (0.0999)
// console.log('Importo da inviare:', amountToSend);

// var data = Buffer.from('Messaggio da salvare', 'utf8');
// var dataScript = Btc.script.nullData.output.encode(data);

// var tx = new Btc.TransactionBuilder(TestNet);
// tx.addInput('595231557188b872662afaea0ee55e8d2ab6fac7ee9ec938511d94d6d04cd362', 1);

// // Address Bitcoin Core: mpns2b5a74asdiQP9wdx7bLmgqastegu3W
// // Address Copay: mkrw59j2wERjWhq5NGKbnrgkvMrp1TzkWT

// tx.addOutput('mpns2b5a74asdiQP9wdx7bLmgqastegu3W', amountToSend);
// tx.addOutput(address, amountToKeep);
// tx.addOutput(dataScript, 0)
// tx.sign(0, keyPair);

// var tx_hex = tx.build().toHex();

// console.log('Transazione in esadecimale: ', tx_hex);

// request.post({
//     url:'https://testnet.blockexplorer.com/api/tx/send',
//     form: {rawtx: tx_hex}
// }, (error, httpResponse, body) => {
//     console.log('error', error);
//     console.log('body', body);
// });