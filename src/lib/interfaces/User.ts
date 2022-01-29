import type { Web3Provider } from "@ethersproject/providers";

export interface UserI {
    account: string,
    walletReady: boolean,
    provider: Web3Provider,

}