<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import AddCoinPopup from '@lib/popups/AddCoinPopup.svelte';

	export let data: PageData;

	const popupAddCoin: PopupSettings = {
		event: 'click',
		target: 'popupAddCoin',
		placement: 'top'
	};

	console.log(data);
</script>

<AddCoinPopup portfolioId={data.id} />

<main class="flex flex-col gap-4">
	<h2 class="h2">Portfolio {data.name}</h2>
	<button class="btn bg-primary-700 w-1/2 self-center" use:popup={popupAddCoin}>Add a coin</button>
	<p>Total value: {data.current_value}$</p>
	<h3 class="h3">Coins</h3>
	{#if data.coinsList.length > 0}
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Name</th>
					<th>Symbol</th>
					<th>Price</th>
					<th>Amount</th>
				</tr>
			</thead>
			<tbody>
				{#each data.coinsList as coin}
					<tr>
						<td>{coin.name}</td>
						<td>{coin.symbol}</td>
						<td>—</td>
						<td>{coin.amount}$</td>
					</tr>{/each}
			</tbody>
		</table>
	{:else}
		<p>No coins yet</p>
	{/if}
</main>
