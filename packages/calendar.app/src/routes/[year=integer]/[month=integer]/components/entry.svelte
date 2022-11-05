<script lang="ts">
  export let text: string;
  export let time: string | null = null;
</script>

<div class="flex">
  <div class="flex-auto w-2/12 text-xs">{time ?? ''}</div>
  <div class="flex-auto w-10/12 text-xs">{text}</div>
</div>
