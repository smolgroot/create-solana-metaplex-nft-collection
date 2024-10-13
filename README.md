# Solana NFT collection creation script

## Install Dependencies

Be sure to have the necessary packages on your system

```sh
# Install Node.js and npm if not already installed
sudo apt update
sudo apt install nodejs npm

# Initialize a new Node.js project
mkdir solana-nft-collection
cd solana-nft-collection
npm init -y

# Install Metaplex JS SDK and Solana Web3.js
npm install @metaplex/js @solana/web3.js
```

##  Deploy

In your terminal, run the script:

```sh
node create_nft_collection.js
```

This script will create an NFT collection and add an item to it using the Metaplex standard. Make sure to replace the metadata URIs with your actual metadata files.

`collection-metadata.json` and `item-metadata.json` are given as an example.