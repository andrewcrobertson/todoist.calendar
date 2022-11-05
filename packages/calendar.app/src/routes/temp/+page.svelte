<script lang="ts">
  import imgUrl from './november.png';
  import Day from './components/day.svelte';
</script>

<div class="grid grid-cols-2 w-595 mx-auto">
  <div>
    <h1 class="text-xl font-bold">November</h1>
    <div class="">
      <img class="h-40" src={imgUrl} alt="november" />
    </div>
    <div class="divide-y">
      <Day value={1} />
      <Day value={2} />
      <Day value={3} />
      <Day value={4} />
    </div>
  </div>
  <div>
    <div class="divide-y">
      <Day value={1} />
      <Day value={2} />
      <Day value={3} />
      <Day value={4} />
    </div>
  </div>
</div>
