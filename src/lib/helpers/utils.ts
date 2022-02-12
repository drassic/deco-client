import type { BigNumberish } from "@ethersproject/bignumber";
import { ethers } from "ethers";

export function weiToEth(wei: BigNumberish): number {
    return Number.parseInt(ethers.utils.formatUnits(wei, 18));
}

export function ethToWei(eth: number): BigNumberish {
    return ethers.utils.parseEther(eth + "");
}

export function clickOutside(element: HTMLElement, callbackFunction: () => void) {
    function onClick(event: MouseEvent) {
        if (!element.contains(event.target as Node)) {
            callbackFunction();
        }
    }

    // don't listen to first click (ex: the one that opens the dropdown)
    setTimeout(() => document.body.addEventListener('click', onClick));

    return {
        update(newCallbackFunction) {
            callbackFunction = newCallbackFunction;
        },
        destroy() {
            document.body.removeEventListener('click', onClick);
        }
    }
}
