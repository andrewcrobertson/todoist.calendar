<script lang="ts">
  import { base } from '$app/paths';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<h1>Site Map</h1>
<ul>
  {#each data.items as item}
    <li><a href={`${base}/${item.url}`}>{item.text}</a></li>
  {/each}
</ul>
