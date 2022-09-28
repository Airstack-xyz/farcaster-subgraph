# farcaster-subgraph
Repo to index farcaster data on Goerli 


This Repo indexes Users on forcaster Dapp. 
1. Every user will have fId
2. One user can have more than 1 fnames. 

Subgraph is deployed here:
[https://api.thegraph.com/subgraphs/name/airstack-xyz/farcaster-goerli](https://api.thegraph.com/subgraphs/name/airstack-xyz/farcaster-goerli)



1. Query to get details of a user by id: 
```
{
  users(where:{id: "100"}) {
    id
    fId
    address
    url
    fnames {
      id
      fname
      tokenURI
      createdAtBlock
      createdAtTimestamp
    }
    createdAtBlock
    createdAtTimestamp
  }
 
}

```
Note: Change Id as required

2. Query to get list of users
   
```
{
  users {
    id
    fId
    address
    url
    fnames {
      id
      fname
      tokenURI
      createdAtBlock
      createdAtTimestamp
    }
    createdAtBlock
    createdAtTimestamp
  }
 
}

``` 
