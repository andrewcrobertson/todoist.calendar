<script lang="ts">
  import Image from './components/image.svelte';
  import Day from './components/day.svelte';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<div class="grid grid-cols-2 w-595 mx-auto">
  <div>
    <h1 class="text-xl font-bold">{data.title.month} {data.title.year}</h1>
    <div class="">
      <Image month={data.title.month} />
    </div>
    <div class="divide-y">
      {#each data.days as day}
        <Day value={day.value} entries={day.entries} />
      {/each}
    </div>
  </div>
</div>
