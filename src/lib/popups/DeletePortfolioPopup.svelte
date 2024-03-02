<script lang="ts">
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	export let id: string | undefined;
	export let i: number;
</script>

<div class="card p-4 w-72 shadow-xl" data-popup={`popupDeletePortfolio-${i}`}>
	<p class="mb-2 text-center">Are you sure ?</p>
	<form action="?/deletePortfolio" method="post">
		<div class="flex justify-cente gap-2">
			<input type="hidden" name="id" value={id} />
			<button type="submit" class="btn bg-primary-600 w-1/2"> Delete </button>
			<button class="btn bg-secondary-600 w-1/2" on:click={(e) => e.preventDefault()}> No! </button>
		</div>
	</form>
</div>
