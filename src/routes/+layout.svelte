<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import NavBar from '$lib/NavBar.svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<NavBar />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<!-- <div class="bg-slate-400 h-full w-52">
			<p class="text-black text-center pt-4 text-xl">Side bar</p>
		</div> -->
	</svelte:fragment>
	<div class="container h-full mx-auto flex justify-center items-center">
		<slot />
	</div>
</AppShell>
