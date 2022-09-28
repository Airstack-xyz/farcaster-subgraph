import { Address, BigInt, Bytes, log } from "@graphprotocol/graph-ts"
import {
  FarcasterNameRegistry,
  Transfer
} from "../generated/FarcasterNameRegistry/FarcasterNameRegistry"

import { Register, FarcasterIdRegistry } from "../generated/FarcasterNameRegistry/FarcasterIdRegistry";

import { User, UserFname } from "../generated/schema";

const ID_REGISTRY = Address.fromString('0xda107a1caf36d198b12c16c7b6a1d1c795978c42');

function getOrCreateUser(fId: BigInt, wallet: Address, blockNumber: BigInt, blockTimestamp: BigInt): User {
  let user = User.load(fId.toString());

  if (user == null) {
    user = new User(fId.toString());
    user.createdAtBlock = blockNumber;
    user.fId = fId;
    user.createdAtTimestamp = blockTimestamp;
  }
  user.address = wallet.toHexString();
  return user;
}

function getOrCreateFName(userId: string, fname: string, tokenURI: string, blockNumber: BigInt, blockTimestamp: BigInt): UserFname {
  const id = userId.concat("_").concat(fname);

  let userFname = UserFname.load(id);
  if (userFname == null) {
    userFname = new UserFname(id);
    userFname.createdAtBlock = blockNumber;
    userFname.createdAtTimestamp = blockTimestamp;
    userFname.fname = fname;
    userFname.user = userId;
    userFname.tokenURI = tokenURI;
  }

  return userFname;
}
export function handleTransfer(event: Transfer): void {

  let toAdress = event.params.to;
  let tokenId = event.params.tokenId;

  const tokenIdRegistry = FarcasterIdRegistry.bind(ID_REGISTRY)
  const fId = tokenIdRegistry.try_idOf(toAdress);
  let user = getOrCreateUser(fId.value, toAdress, event.block.number, event.block.timestamp);;

  const fname = Bytes.fromHexString(event.params.tokenId.toHexString()).toString()

  log.info("transfer from {} to {} token id {} hex {} fId {} userId {} ",
    [event.params.from.toHexString(), toAdress.toHexString(), tokenId.toString(), fname, fId.value.toString(), user.id])

  const nameRegistry = FarcasterNameRegistry.bind(event.address);
  const tokenURI = nameRegistry.try_tokenURI(tokenId);
  const userFName = getOrCreateFName(user.id, fname, tokenURI.value, event.block.number, event.block.timestamp);

  user.save();
  userFName.save();
}

export function handleRegister(event: Register): void {

  log.info("register id {} to {} recovery {} url {} ",
    [event.params.id.toString(), event.params.to.toHexString(), event.params.recovery.toHexString(), event.params.url])

  const user = getOrCreateUser(event.params.id, event.params.to, event.block.number, event.block.timestamp);
  user.url = event.params.url;
  user.save();
}

