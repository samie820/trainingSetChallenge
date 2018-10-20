import fs from "fs";
import ipfsAPI from "ipfs-api";
import web3 from "./web3";
import storehash from "./storehash";

export const uploadHashToBlockchain = ipfsHash => {
  //bring in user's metamask account address
  const accounts = web3.eth.accounts;
  console.log("Sending from Metamask account: " + accounts[0]);
  //obtain contract address from storehash.js
  //  const ethAddress= await storehash.options.address;
  storehash.methods.sendHash(ipfsHash).send(
    {
      from: accounts[0]
    },
    (error, transactionHash) => {
      console.log(transactionHash);
    }
  );
};

const ipfs = ipfsAPI("ipfs.infura.io", "5001", { protocol: "https" });

const uploadFileToIPFS = (file, callback) => {
  // const bufferedFile = new Buffer(file);
  ipfs.files.add(file, function(err, file) {
    if (err) {
      callback(err, null);
    }
    callback(null, file);
    uploadHashToBlockchain(file[0].hash);
  });
};

export default uploadFileToIPFS;
