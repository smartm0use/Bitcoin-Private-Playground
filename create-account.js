const request = require('request');
const Btc = require('bitcoinjs-lib');
const TestNet = Btc.networks.testnet;
const apiUrl = 'https://testnet.blockexplorer.com/api/addr/';

// let keyPair = Btc.ECPair.makeRandom({network: TestNet});
// let publicKey = keyPair.getAddress();
// let privateKey = keyPair.toWIF();
// console.log(`Public: ${publicKey} \nPrivate: ${privateKey}`);

var privateKey = 'cPVrtDvhfwKNq4GN3hvmm8CHhvjKViXyeERX6JeQ7UGUVGw1k4Zg';
var ourWallet = new Btc.ECPair.fromWIF(privateKey, TestNet);
var publicKey = ourWallet.getAddress();
console.log("ourWallet public key:", publicKey);

// log balance
request.get(apiUrl + publicKey, (err, req, body) => {
    var response = JSON.parse(body);
    console.log('Balance: ', response['balance']);
});