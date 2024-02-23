<script lang="ts">
	import { coinsStore } from '../stores/coins.store';

	console.log($coinsStore);
</script>

<div class="container h-full mx-auto flex justify-center items-center">
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
					<th>Name</th>
					<th>Symbol</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody>
				{#each $coinsStore as coin}
					<tr>
						<td>{coin.name}</td>
						<td>{coin.symbol}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
