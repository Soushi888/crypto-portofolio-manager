<script lang="ts">
	export let data;

	console.log(data);
</script>

<main class="flex flex-col items-center justify-center gap-5">
	<div>
		<button class="btn bg-primary-500">Add to a portfolio</button>
	</div>
	<img src={data.image?.large} alt={data.name} />
	<h2 class="h2">{data.name}</h2>
	<p>Price: {data.market_data?.current_price.usd}$</p>
</main>
