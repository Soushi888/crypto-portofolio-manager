<script lang="ts">
	export let id: string | undefined;
	export let i: number;
</script>

<div class="card p-4 w-72 shadow-xl" data-popup={`popupRenamePortfolio-${i}`}>
	<div>
		<form action="?/renamePortfolio" method="post" class="flex flex-col gap-2 items-center">
			<input type="hidden" name="id" value={id} />
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
			<button type="submit" class="btn bg-primary-600 w-1/2">Rename</button>
		</form>
	</div>
	<div class="arrow bg-surface-100-800-token" />
</div>
