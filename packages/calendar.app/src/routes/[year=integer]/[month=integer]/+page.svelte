<script lang="ts">
  import Image from './components/image.svelte';
  import Day from './components/day.svelte';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<div class="grid grid-cols-2 gap-4 w-21 mx-auto">
  <div>
    <h1 class="text-4xl font-bold pb-6">{data.title.month} {data.title.year}</h1>
    <div class=" pb-6">
      <Image month={data.title.month} />
    </div>
    <div class="divide-y divide-gray-400">
      {#each data.days1 as day}
        <Day value={day.value} dayName={day.dayName} entries={day.entries} />
      {/each}
    </div>
  </div>
  <div>
    <div class="divide-y divide-gray-400">
      {#each data.days2 as day}
        <Day value={day.value} dayName={day.dayName} entries={day.entries} />
      {/each}
    </div>
  </div>
</div>
