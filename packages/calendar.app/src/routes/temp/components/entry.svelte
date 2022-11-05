<script lang="ts">
  export let text: string;
  export let time: string | null = null;
</script>

<div class="flex">
  <div class="flex-auto w-4/12 p-2">{time ?? ''}</div>
  <div class="flex-auto w-8/12 p-2">{text}</div>
</div>
