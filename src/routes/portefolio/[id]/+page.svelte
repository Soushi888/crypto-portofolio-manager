<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data);
</script>

<main class="flex flex-col gap-4">
	<h2 class="h2">Portfolio {data.name}</h2>
	<p>Total value: {data.current_value}$</p>
</main>
