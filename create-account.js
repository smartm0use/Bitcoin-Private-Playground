const request = require('request');
const Btc = require('bitcoinjs-lib');
const TestNet = Btc.networks.testnet;
const apiUrl = 'https://testnet.blockexplorer.com/api/addr/';

var keyPair = Btc.ECPair.makeRandom({network: TestNet});
var address = keyPair.getAddress();
var privateKey = keyPair.toWIF();
console.log(`Indirizzo: ${address} \nChiave privata: ${privateKey}`);

// var privateKey = 'cPVrtDvhfwKNq4GN3hvmm8CHhvjKViXyeERX6JeQ7UGUVGw1k4Zg';
// var keyPair = new Btc.ECPair.fromWIF(privateKey, TestNet);
// var address = keyPair.getAddress();
// console.log(`Indirizzo: ${address} \nChiave privata: ${privateKey}`);

// log balance
request.get(apiUrl + address, (err, req, body) => {
    var response = JSON.parse(body);
console.log('Saldo:', response['balance']);
});