<script lang="ts">
  import Entry from './entry.svelte';
  export let value: number;
</script>

<div class="flex">
  <div class="p-2">
    <div class="flex justify-center items-center w-10 h-10 md:w-12 md:h-12 xl:w-14 xl:h-14 rounded-full bg-black text-xl text-white font-medium">{value}</div>
  </div>
  <div class="flex-1">
    <Entry text="Event" time="10:00am" />
    <Entry text="Event" time="10:00am" />
    <Entry text="Event" />
  </div>
</div>
