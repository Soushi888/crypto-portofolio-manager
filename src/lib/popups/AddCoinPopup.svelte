<script lang="ts">
  import { enhance } from '$app/forms';

  export let portfolioId: string | undefined;
</script>

<div class="card w-72 p-4 shadow-xl" data-popup={`popupAddCoin`}>
  <p class="mb-4 text-center">Add a coin</p>
  <form action="?/addCoin" method="POST" use:enhance>
    <div class="flex flex-col items-center gap-2">
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

      <button type="submit" class="btn w-1/2 bg-primary-600">Add</button>
    </div>
  </form>
</div>
