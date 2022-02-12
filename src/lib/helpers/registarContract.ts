import { CourseSummary } from "$lib/objects/CourseSummary";
import { userStore } from "$lib/stores/userStore";
import { BigNumber, Contract, ethers } from "ethers";
import { get } from "svelte/store";
import { ethToWei, weiToEth } from "./utils";
import Registar from '$lib/artifacts/contracts/Registar.sol/Registar.json';
import type { CourseMeta, CourseStats } from "$lib/interfaces/Course";

interface CourseInfo {
    stats: CourseStats,
    meta: CourseMeta
}

export class RegistarHelper {
    private regFee = 0;
    private ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    private reg: Contract;

    constructor() {
        this.updateReg();
        this.reg.getRegistarFee().then((fee: BigNumber) => {
            this.regFee = weiToEth(fee);
        }).catch(e => {
            console.error("Could not get reg fee: " + e);
        })
    }

    /**
     * Call when provider updates (when more wallets are supported)??
     */
    updateReg() {
        this.reg = new ethers.Contract(this.ADDRESS, Registar.abi, get(userStore).provider);
    }

    async register(courseAddress: string, courseSummary: CourseSummary) {
        const tx = await this.connectedContract
            .register(courseAddress, { value: ethToWei(courseSummary.price + this.regFee) });
        return tx;
    }

    async courseSummary(courseAddress: string) {
        const info = await this.connectedContract.getCourseInfo(courseAddress) as CourseInfo;
        return new CourseSummary(info.stats, info.meta);
    }

    // Get contract connected as the current signer
    private get connectedContract(): Contract {
        return this.reg.connect(get(userStore).provider.getSigner());
    }
}
