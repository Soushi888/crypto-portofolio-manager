<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;

	const popupCreatePortfolio: PopupSettings = {
		event: 'click',
		target: 'popupCreatePortfolio',
		placement: 'top'
	};

	const popupDeletePortfolio: PopupSettings = {
		event: 'click',
		target: 'popupDeletePortfolio',
		placement: 'right'
	};
</script>

<div class="flex flex-col items-center justify-center gap-5">
	<h2 class="h2">Portfolios</h2>

	{#if data.portfolios.length === 0}
		<p>No portfolios found</p>
		<button class="btn bg-primary-600" use:popup={popupCreatePortfolio}
			>Create a new portfolio</button
		>
	{:else}
		<button class="btn bg-primary-600" use:popup={popupCreatePortfolio}
			>Create a new portfolio</button
		>

		<table class="table">
			<thead>
				<tr>
					<th class="text-center">Name</th>
					<th class="text-center">Total Value</th>
					<th class="text-center">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.portfolios as portfolio, i}
					<tr>
						<td class="text-center">{portfolio.name}</td>
						<td class="text-center">{portfolio.current_value}$</td>
						<td class="flex justify-center">
							<button
								use:popup={{
									event: 'click',
									target: `popupDeletePortfolio-${i}`,
									placement: 'top'
								}}
							>
								<img src="/trash.png" width="24" alt="Delete portfolio icon" />
							</button>
						</td>
					</tr>
					<div class="card p-4 w-72 shadow-xl" data-popup={`popupDeletePortfolio-${i}`}>
						<p class="mb-2 text-center">Are you sure ?</p>
						<form action="?/deletePortfolio" method="post">
							<div class="flex justify-cente gap-2">
								<input type="hidden" name="id" value={data.portfolios[i].id} />
								<button type="submit" class="btn bg-primary-600 w-1/2">Delete</button>
								<button class="btn bg-secondary-600 w-1/2" on:click={(e) => e.preventDefault()}>
									No!
								</button>
							</div>
						</form>
					</div>
				{/each}
			</tbody>
		</table>
	{/if}
</div>

<div class="card p-4 w-72 shadow-xl" data-popup="popupCreatePortfolio">
	<div>
		<form action="?/createPortfolio" method="post" class="flex flex-col gap-2 items-center">
			<div class="form-control">
				<input
					type="text"
					name="name"
					class="input"
					placeholder="Name"
					required
					autocomplete="off"
				/>
			</div>
			<button type="submit" class="btn bg-primary-600 w-1/2">Create</button>
		</form>
	</div>
	<div class="arrow bg-surface-100-800-token" />
</div>
