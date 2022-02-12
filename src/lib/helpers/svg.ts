import type { SVGI } from "$lib/interfaces/SVG";

const SVGs = {
    star: {
        path: "M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z",
        viewbox: "0 0 24 24"
    }
}

export function getSVG(key: string): SVGI {
    return SVGs[key];
}