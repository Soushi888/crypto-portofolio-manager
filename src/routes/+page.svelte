<script lang="ts">
	export let data;
</script>

<div class="space-y-10 text-center flex flex-col items-center">
	<h2 class="h2">Portefolio Manager.</h2>
	<!-- Animated Logo -->

	<!-- / -->
	<a class="btn variant-filled" href="/portefolio/new"> Create a Portefolio </a>
	<div>
		<h2 class="h2">All coins</h2>
	</div>
	<table>
		<thead>
			<tr>
				<th>#</th>
				<th>Name</th>
				<th>Symbol</th>
				<th>Price</th>
			</tr>
		</thead>
		<tbody>
			{#each data.coinsList as coin}
				<tr>
					<td>{coin.market_cap_rank}</td>
					<td>{coin.name}</td>
					<td>{coin.symbol}</td>
					<td>{coin.current_price}$</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
