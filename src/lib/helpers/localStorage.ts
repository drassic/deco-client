import localforage from 'localforage';
const { setItem, getItem } = localforage;

export async function getRecentCourses(address: string): Promise<string[]> {
    try {
        return await getItem(address + "_courses");
    } catch (e) {
        console.error("Error getting recent courses: " + e);
        return [];
    }
}

export async function setRecentCourses(address: string, courses: string[]) {
    try {
        await setItem(address + "_courses", courses);
    } catch (e) {
        console.error("Error setting recent courses: " + e);
    }
}