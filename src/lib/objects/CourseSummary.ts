import type { CourseMeta, CourseStats } from "$lib/interfaces/Course";
import { weiToEth } from "$lib/helpers/utils";

export class CourseSummary {

    name: string;
    price: number;
    stars: number;
    ratingsCount: number;
    symbol: string;
    enrollmentCount: number;
    isStudent: boolean;

    constructor(stats: CourseStats, meta: CourseMeta) {
        this.enrollmentCount = stats.enrollmentCount.toNumber();
        this.price = weiToEth(meta.price);
        this.name = meta.name;
        this.symbol = meta.symbol;
        const totalStars = stats.totalStars.toNumber();
        const totalRatings = stats.ratingsCount.toNumber();
        this.stars = totalRatings ? totalStars / totalRatings : 0;
        this.ratingsCount = totalRatings;
        this.isStudent = meta.isStudent;
    }
}