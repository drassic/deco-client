<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { load as loadYML } from 'js-yaml';
	const target =
		'https://bafybeifxajapeymuwrblj37q3bbaahctsph3xpljl3kmyutr6wnufetrz4.ipfs.dweb.link/example.yaml';

	// see https://kit.svelte.dev/docs#loading
	export const load: Load = async ({ params, fetch }) => {
		const res = await fetch(target);
		console.log(params.address);
		// fetch(target)
		// .then((res) => res.text())
		// .then((str) => {
		// 	course = load(str) as Course;
		// 	loading = false;
		// })
		// .catch((e) => console.error(e));

		if (res.ok) {
			const yml = await res.text();
			const course = loadYML(yml) as Course;

			return {
				props: { course }
			};
		}

		const { message } = await res.json();

		return {
			error: new Error(message)
		};
	};
</script>

<script lang="ts">
	// import { scale } from 'svelte/transition';
	// import { flip } from 'svelte/animate';
	import type { Course } from '$lib/interfaces/Course';

	export let course: Course;

	// 	type Todo = {
	// 		uid: string;
	// 		created_at: Date;
	// 		text: string;
	// 		done: boolean;
	// 		pending_delete: boolean;
	// 	};

	// 	export let todos: Todo[];

	// 	async function patch(res: Response) {
	// 		const todo = await res.json();

	// 		todos = todos.map((t) => {
	// 			if (t.uid === todo.uid) return todo;
	// 			return t;
	// 		});
	// 	}
</script>

<h1>{course.name}</h1>
<p>{course.description}</p>

<!-- <iframe src={cou}></iframe> -->


