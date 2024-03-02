<script lang="ts">
	export let data;
</script>

<main class="space-y-10 text-center flex flex-col items-center">
	<h2 class="h1">Crypto Portfolio Manager</h2>
	<div>
		<h2 class="h2">Top 100 coins</h2>
	</div>
	<table class="table table-hover">
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
					<td>
						<div class="flex items-center gap-2">
							<img src={coin.image} alt={coin.name} width="24" />
							<a
								href="https://www.coingecko.com/en/coins/{coin.id}"
								class="hover:underline"
								target="_blank"
							>
								{coin.name}
							</a>
						</div>
					</td>
					<td>{coin.symbol}</td>
					<td>{coin.current_price}$</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>
