import type { CourseI, TopicI } from '$lib/interfaces/Course';
import { writable } from 'svelte/store';

function createStore() {
	const { subscribe, set } = writable<TopicI|CourseI>();

	return {
		subscribe,
		set,
		reset: () => set(null)
	};
}

export const currentTopic = createStore();