import { Address, BigInt, Bytes, log } from "@graphprotocol/graph-ts"
import {
  FarcasterNameRegistry,
  Transfer
} from "../generated/FarcasterNameRegistry/FarcasterNameRegistry"

import {TokenIdRegistry} from "../generated/FarcasterNameRegistry/TokenIdRegistry";
 
import {User} from "../generated/schema";

const ID_REGISTRY = Address.fromString('0xB30fB6baa3782Ae8f00ea0d40E72483B098F5Cb2');

export function handleTransfer(event: Transfer): void {

  let toAdress = event.params.to;
  let tokenId = event.params.tokenId;

  let user = User.load(toAdress.toHexString());
  
 const fname = Bytes.fromHexString(event.params.tokenId.toHexString()).toString()
  log.info("transfer from {} to {} token id {} hex {} ", 
  [event.params.from.toHexString(), toAdress.toHexString(), tokenId.toString(), fname])

  if(user == null) {
    user = new User(toAdress.toHexString());
  }
  user.address = toAdress.toHexString();
  user.fname = fname;

  const nameRegistry = FarcasterNameRegistry.bind(event.address);
  const tokenIdRegistry = TokenIdRegistry.bind(ID_REGISTRY)

  const fId = tokenIdRegistry.try_idOf(toAdress);

  if(!fId.reverted) {
    user.fId = fId.value;
  }
  const tokenURI = nameRegistry.try_tokenURI(tokenId);

  if(!tokenURI.reverted) {
    user.url = tokenURI.value;
  }
  
  user.save();
}

