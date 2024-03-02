<script>
	import { AppBar } from '@skeletonlabs/skeleton';
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<h1>
			<a href="/"><strong class="text-xl uppercase">Crypto portfolio Manager</strong></a>
		</h1>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<a class="btn btn-sm bg-primary-600" href="/portfolios">Portfolios</a>
	</svelte:fragment>
</AppBar>
