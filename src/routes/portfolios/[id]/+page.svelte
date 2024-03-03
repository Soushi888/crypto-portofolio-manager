<script lang="ts">
  import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
  import type { PageData } from './$types';
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
  <button class="btn w-1/2 self-center bg-primary-700" use:popup={popupAddCoin}>
    Add a coin
  </button>
  <p>Total value: {data.current_value}$</p>
  <p>Stakeholders: {data.stakeholders?.join(', ')}</p>
  <h3 class="h3">Coins</h3>
  {#if data.coinsList.length > 0}
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each data.coinsList as coin}
          <tr>
            <td>
              <a
                href="https://www.coingecko.com/en/coins/{''}"
                target="_blank"
                class="hover:underline"
              >
                {coin.name}
              </a>
            </td>
            <td>{coin.symbol}</td>
            <td>—</td>
            <td>{coin.amount}$</td>
            <td class="flex justify-center gap-2">
              <a
                href="/portfolios/{data.id}/coin?coin_id={coin.id}"
                class="hover:underline"
                title="View transactions"
              >
                <img src="/transactions-icon.png" width="24" alt="View transactions icon" />
              </a>
              <button title="Delete coin">
                <img src="/trash-icon.png" width="24" alt="Delete coin icon" />
              </button>
            </td>
          </tr>{/each}
      </tbody>
    </table>
  {:else}
    <p>No coins yet</p>
  {/if}
</main>
