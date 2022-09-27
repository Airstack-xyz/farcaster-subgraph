# farcaster-subgraph
Repo to index farcaster data on Goerli 


This Repo indexes Users on forcaster Dapp. 

Subgraph is deployed here:
[https://thegraph.com/hosted-service/subgraph/0xsarvesh/farcaster-goerli](https://thegraph.com/hosted-service/subgraph/0xsarvesh/farcaster-goerli)


1. Query to get details of a user by address: 
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
Note: Change Id as required

2. Query to get list of users
   
```
{
  users(first: 5) {
    id
    address
    fname
    fId
  }
}

``` 
