const request = require('request');
const proxiedRequest = request.defaults({proxy: "http://localhost:3128"});
const Btc = require('bitcoinjs-lib');
const TestNet = Btc.networks.testnet;
const apiUrl = 'https://testnet.blockexplorer.com/api/addr/';

// let keyPair = Btc.ECPair.makeRandom({network: TestNet});
// let publicKey = keyPair.getAddress();
// let privateKey = keyPair.toWIF();
// console.log(`Public: ${publicKey} \nPrivate: ${privateKey}`);

let privateKey = 'cPVrtDvhfwKNq4GN3hvmm8CHhvjKViXyeERX6JeQ7UGUVGw1k4Zg';
let ourWallet = new Btc.ECPair.fromWIF(privateKey, TestNet);
let publicKey = ourWallet.getAddress();
console.log("ourWallet public key:", publicKey);

// log balance
proxiedRequest.get(apiUrl + publicKey, (err, req, body) => {
    // console.log(JSON.parse(body));
    let response = JSON.parse(body);
    console.log('Balance: ', response['balance']);
});
