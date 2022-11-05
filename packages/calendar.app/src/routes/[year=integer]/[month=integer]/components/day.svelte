<script lang="ts">
  import Entry from './entry.svelte';
  export let value: number;
  export let entries: { time: string; text: string }[];
</script>

<div class="flex">
  <div class="p-2">
    <div class="flex justify-center items-center w-8 h-8 rounded-full bg-black text-sm text-white font-medium">{value}</div>
  </div>
  <div class="flex-1">
    {#each entries as entry}
      <Entry text={entry.text} time={entry.time} />
    {/each}
  </div>
</div>
