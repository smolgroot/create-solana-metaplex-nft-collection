// Import necessary libraries
const { Connection, Keypair, LAMPORTS_PER_SOL } = require('@solana/web3.js');
const { Metaplex, keypairIdentity, bundlrStorage } = require('@metaplex/js');

// Initialize connection and wallet
const connection = new Connection('https://api.mainnet-beta.solana.com');
const wallet = Keypair.generate();

// Airdrop SOL to the wallet for transaction fees (only for devnet)
async function airdropSol() {
  const airdropSignature = await connection.requestAirdrop(wallet.publicKey, 2 * LAMPORTS_PER_SOL);
  await connection.confirmTransaction(airdropSignature);
}

// Initialize Metaplex
const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(wallet))
  .use(bundlrStorage());

// Function to create an NFT collection
async function createNftCollection() {
  const { nft } = await metaplex.nfts().create({
    uri: 'https://example.com/collection-metadata.json', // Replace with your metadata URI
    name: 'My NFT Collection',
    sellerFeeBasisPoints: 500, // 5% seller fee
    symbol: 'MYCOLL',
    isCollection: true,
  });

  console.log('Collection NFT created:', nft);
  return nft;
}

// Function to add an item to the collection
async function addItemToCollection(collectionNft) {
  const { nft } = await metaplex.nfts().create({
    uri: 'https://example.com/item-metadata.json', // Replace with your metadata URI
    name: 'My NFT Item',
    sellerFeeBasisPoints: 500, // 5% seller fee
    symbol: 'MYITEM',
    collection: collectionNft.address,
  });

  console.log('Item NFT added to collection:', nft);
}

// Main function to execute the script
(async () => {
  await airdropSol(); // Only for devnet
  const collectionNft = await createNftCollection();
  await addItemToCollection(collectionNft);
})();