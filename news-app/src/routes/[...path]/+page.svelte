<script>
  /** @type {import('./$types').PageData} */
  let { data } = $props();
</script>

<svelte:head>
  <meta http-equiv="refresh" content="0;url={data.redirectUrl}" />
</svelte:head>

<p>リダイレクト中...</p>
