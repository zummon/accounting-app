<script>
	import { trans, queryTrans } from "../lib/store";
	import { onMount } from "svelte";

	let ref = ''
	let name = ''
	let account = ''

	onMount(async () => {
		
	});
</script>

<div class="px-2 pt-2">
	<h1 class="mb-2 text-xl font-medium">Filter/Query</h1>

	<hr />

	<label class="mb-2 border rounded-lg">
		<span class="mx-2 font-semibold">Ref: </span>
		{#each $queryTrans.refs as value, index (`query-ref-${index}`)}
			<button class="mr-2" on:click={() => {
				$queryTrans.refs.splice(index, 1) 
			}}>
				{value}
			</button>
		{/each}
		<input class="border-0 rounded-lg" type="text" list="refs" bind:value={ref} />
	</label>
	<button class="border rounded-lg mb-2 mr-2" on:click={() => {
		$queryTrans.refs.push(ref)
	}}>
		include
	</button>
	<button class="border rounded-lg mb-2 mr-2" on:click={() => {
		$queryTrans.refs = []
	}}>
		Clear
	</button>

	<hr />

	<label class="mb-2 mr-2 border">
		<span class="mr-2 font-semibold">Start date: </span>
		<input class="border-0" type="datetime-local" bind:value={$queryTrans.date.start} />
	</label>
	
	<label class="mb-2 mr-2 border">
		<span class="mr-2 font-semibold">End date: </span>
		<input class="border-0" type="datetime-local" bind:value={$queryTrans.date.end} />
	</label>

	<hr />

	<label class="mb-2 mr-2 border">
		<span class="mr-2 font-semibold">Name: </span>
		{#each $queryTrans.names as value, index (`query-ref-${index}`)}
			<button class="mr-2" on:click={() => {
				$queryTrans.names.splice(index, 1) 
			}}>
				{value}
			</button>
		{/each}
		<input class="border-0 rounded-lg" type="text" list="names" bind:value={name} />
	</label>
	<button class="border rounded-lg mb-2 mr-2" on:click={() => {
		$queryTrans.names = []
	}}>
		Clear
	</button>
	
	<hr />

	<label class="mb-2 mr-2 border">
		<span class="mr-2 inline-flex font-semibold">Account: </span>
		{#each $queryTrans.accounts as value, index (`query-ref-${index}`)}
			<button class="mr-2" on:click={() => {
				$queryTrans.accounts.splice(index, 1) 
			}}>
				{value}
			</button>
		{/each}
		<input class="border-0" type="text" list="accounts" bind:value={account} />
	</label>
	<button class="border rounded-lg mb-2 mr-2" on:click={() => {
		$queryTrans.accounts = []
	}}>
		Clear
	</button>
</div>

<table class="w-full border rounded-lg">
  <thead>
    <tr>
      <th class="px-4 py-2 border-b">Date</th>
      <th class="px-4 py-2 border-b">Name</th>
      <th class="px-4 py-2 border-b">?</th>
    </tr>
  </thead>
  <tbody>
		{#each $trans as { ref, doc, ledger }, index (`data-${ref}`)}
			<tr class={index % 2 ? '' : 'bg-gray-50'}>
				<td class="px-4 py-2 border-b">{new Date(doc[0].date).toDateString()}</td>
				<td class="px-4 py-2 border-b">{doc[0].name}</td>
				<td class="px-4 py-2 border-b">{''}</td>
			</tr>
		{/each}
  </tbody>
	<tfoot>
    <tr>
      <td class="px-4 py-2 text-right"></td>
      <td class="px-4 py-2 text-right">Total</td>
      <td class="px-4 py-2 text-right"></td>
    </tr>
  </tfoot>
</table>