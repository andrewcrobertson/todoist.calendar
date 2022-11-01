<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<h1>{data.title.month} {data.title.year}</h1>
<!-- <a href={`/${data.previous.year}/${data.previous.month}`}>Previous</a><a href={`/${data.next.year}/${data.next.month}`}>Next</a> -->
{#each data.days as day}
  <h2>{day.value}</h2>
  {#each day.entries as entry}
    <h3>{entry.text} {entry.time ?? ''}</h3>
  {/each}
{/each}
