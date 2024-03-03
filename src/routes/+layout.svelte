<script lang="ts">
  import '../app.postcss';
  import { AppShell, AppBar } from '@skeletonlabs/skeleton';

  // Floating UI for Popups
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
  import { storePopup } from '@skeletonlabs/skeleton';
  import NavBar from '$lib/NavBar.svelte';
  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<AppShell>
  <svelte:fragment slot="header">
    <NavBar />
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft">
    <!-- <div class="h-full w-52 bg-slate-400">
      <p class="pt-4 text-center text-xl text-black">Side bar</p>
    </div> -->
  </svelte:fragment>
  <div class="container mx-auto flex h-full items-center justify-center pt-4">
    <slot />
  </div>
</AppShell>
