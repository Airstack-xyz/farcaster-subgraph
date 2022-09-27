# farcaster-subgraph
Repo to index farcaster data on Goerli 


This Repo indexes Users on forcaster Dapp. 

Subgraph is deployed here:
[https://thegraph.com/hosted-service/subgraph/0xsarvesh/farcaster-goerli](https://thegraph.com/hosted-service/subgraph/0xsarvesh/farcaster-goerli)


Query: 
```
{
  user(id: "0x24f182e4a138dc8c1c60b305685092e95a96f56e") {
    id
    address
    fname
    fId
  }
}

```

