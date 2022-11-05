<script lang="ts">
  import { lowerCase } from 'lodash-es';
  import Entry from './entry.svelte';
  export let dayName: string;
  export let value: number;
  export let entries: { time: string; text: string }[];

  const getColourClass = (dayName: string) => {
    if (dayName === 'saturday' || dayName === 'sunday') return 'bg-green-500';
    return 'bg-black';
  };

  const colourClass = getColourClass(lowerCase(dayName));
</script>

<div class="flex mt-4">
  <div class="p-2">
    <div class="flex justify-center items-center w-6 h-6 rounded-full {colourClass} text-sm text-white font-medium">{value}</div>
  </div>
  <div class="flex-1">
    {#each entries as entry}
      <Entry text={entry.text} time={entry.time} />
    {/each}
  </div>
</div>
