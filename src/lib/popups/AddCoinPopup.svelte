<script lang="ts">
	import { enhance } from '$app/forms';

	export let portfolioId: string | undefined;
</script>

<div class="card p-4 w-72 shadow-xl" data-popup={`popupAddCoin`}>
	<p class="text-center mb-4">Add a coin</p>
	<form action="?/addCoin" method="POST" use:enhance>
		<div class="flex flex-col gap-2 items-center">
			<input type="hidden" name="portfolio_id" value={portfolioId} />
			<div class="form-control">
				<input
					type="search"
					name="coin_name"
					placeholder="Search coin"
					class="input"
					autocomplete="off"
				/>
			</div>

			<button type="submit" class="btn bg-primary-600 w-1/2">Add</button>
		</div>
	</form>
</div>
