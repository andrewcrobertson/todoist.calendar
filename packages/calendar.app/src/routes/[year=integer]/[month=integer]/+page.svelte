<script lang="ts">
  import Image from './components/image.svelte';
  import Day from './components/day.svelte';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<div class="flex flex-col flex-wrap w-21 h-29 mx-auto space-y-4 divide-y divide-gray-400 pl-5">
  <div class="w-45">
    <h1 class="text-4xl font-bold pb-6">{data.title.month} {data.title.year}</h1>
    <div>
      <Image month={data.title.month} />
    </div>
  </div>
  {#each data.days as day}
    <Day value={day.value} dayName={day.dayName} entries={day.entries} />
  {/each}
  <div />
</div>
