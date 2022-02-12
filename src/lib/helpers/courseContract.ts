import { userStore } from "$lib/stores/userStore";
import { Contract, ethers } from "ethers";
import { get } from "svelte/store";
import PaidCourse from '$lib/artifacts/contracts/PaidCourse.sol/PaidCourse.json';
import Course from '$lib/artifacts/contracts/Course.sol/Course.json';
import type { CourseI, TopicI } from "$lib/interfaces/Course";
import { load as loadYML } from 'js-yaml';

export class CourseHelper {
    private course: Contract;
    private user = userStore;

    /**
     * Build a course contract helper
     * 
     * @param address contract address of course
     * @param isPaid wether or not to build course with paid abi. (May not be necessary if only free methods are used in here)
     */
    constructor(address: string, isPaid = false) {
        const abi = isPaid ? PaidCourse.abi : Course.abi;
        this.course = new ethers.Contract(address, abi, get(userStore).provider);
    }

    /**
     * Download course content and parse into course topics
     * 
     * @returns Async list of topics
     *          Course name and first sections are flattened into first topic
     */
    async getTopics(): Promise<TopicI[]> {
        const uri = await this.connectedContract.courseURI();
        const courseContent = await this.loadCourse(uri);
        // Check if topics and sections exist?
        const topics: TopicI[] = [];

        if (courseContent.sections) {
            topics.push({ name: courseContent.name ? courseContent.name : "", sections: courseContent.sections })
        }

        if (courseContent.topics) {
            topics.push(...courseContent.topics);
        }

        this.user.addRecentCourse(this.course.address);
        return topics;
    }

    private async loadCourse(uri: string) {
        const res = await fetch(uri);
        if (res.ok) {
            const yml = await res.text();
            return loadYML(yml) as CourseI;
        } else {
            throw Error(`Could not fetch course: ${res.status}: ${res.statusText}`)
        }
    }

    // Get contract connected as the current signer
    private get connectedContract(): Contract {
        return this.course.connect(get(userStore).provider.getSigner());
    }
}
