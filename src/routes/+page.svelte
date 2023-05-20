<script>
	import { trans, queryTrans } from "../lib/store";
	import { modelQueryTrans } from "../lib/model";
	import { onMount } from "svelte";
	import chartjs from 'chart.js/auto';

	let ref = ''
	let name = ''
	let account = ''

	let chartValues = [20, 10, 5, 2, 20, 30, 45];
	let chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
	let ctx;
	let chartCanvas;

	onMount(async () => {
		ctx = chartCanvas.getContext('2d');
		let chart = new chartjs(ctx, {
			type: 'bar',
			data: {
				labels: chartLabels,
				datasets: [{
					label: 'Revenue',
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgb(255, 99, 132)',
					data: chartValues
				}]
			}
		});

	});
</script>

<div class="px-2 pb-4">
	<span class="mb-2 mr-2 text-xl">Filter - Query</span>
	<button class="mb-2 mr-2 text-fuchsia-500 print:hidden" on:click={() => {
		// $queryTrans = { ...modelQueryTrans }
		ref = ''
		name = ''
		account = ''
	}}>
		Clear
	</button>
	<br />
	<label class="mb-2 mr-2">
		<span class="mr-2">Start date:</span>
		<input class="border-0 px-2 py-0.5 bg-transparent" type="datetime-local" bind:value={$queryTrans.date.start} />
	</label>
	<br />
	<label class="mb-2 mr-2">
		<span class="mr-2">End date:</span>
		<input class="border-0 px-2 py-0.5 bg-transparent" type="datetime-local" bind:value={$queryTrans.date.end} />
	</label>
	<br />
	<label class="mb-2 mr-2" for="ref">
		<span class="">Ref:</span>
	</label>
	{#each $queryTrans.refs as value, index (`query-ref-${index}`)}
		<button class="mb-2 mr-2 text-fuchsia-500 border-fuchsia-500 print:text-black print:border-gray-500 border-2 rounded-3xl px-2 py-0.5" on:click={() => {
			$queryTrans.refs.splice(index, 1) 
			$queryTrans.refs = $queryTrans.refs
		}}>
			{value}
		</button>
	{/each}
	<input class="border-0 px-2 py-0.5 bg-transparent print:hidden" type="text" list="refs" id="ref" placeholder="type then click include" bind:value={ref} />
	<button class="mb-2 mr-2 text-sky-500 print:hidden" on:click={() => {
		if (ref && $queryTrans.refs.indexOf(ref) == -1) {
			$queryTrans.refs.push(ref)
			$queryTrans.refs = $queryTrans.refs
			ref = ''
		}
	}}>
		include
	</button>
	<br />
	<label class="mb-2 mr-2" for="name">
		<span class="mr-2">Name:</span>
	</label>
	{#each $queryTrans.names as value, index (`query-name-${index}`)}
		<button class="mb-2 mr-2 text-fuchsia-500 border-fuchsia-500 print:text-black print:border-gray-500 border-2 rounded-3xl px-2 py-0.5" on:click={() => {
			$queryTrans.names.splice(index, 1)
			$queryTrans.names = $queryTrans.names 
		}}>
			{value}
		</button>
	{/each}
	<input class="border-0 px-2 py-0.5 bg-transparent print:hidden" type="text" list="names" id="name" placeholder="type then click include" bind:value={name} />
	<button class="mb-2 mr-2 text-sky-500 print:hidden" on:click={() => {
		if (name && $queryTrans.names.indexOf(name) == -1) {
			$queryTrans.names.push(name)
			$queryTrans.names = $queryTrans.names
			name = ''
		}
	}}>
		include
	</button>
	<br />
	<label class="mb-2 mr-2" for="account">
		<span class="mr-2">Account:</span>
	</label>
	{#each $queryTrans.accounts as value, index (`query-account-${index}`)}
		<button class="mb-2 mr-2 text-fuchsia-500 border-fuchsia-500 print:text-black print:border-gray-500 border-2 rounded-3xl px-2 py-0.5" on:click={() => {
			$queryTrans.accounts.splice(index, 1) 
			$queryTrans.accounts = $queryTrans.accounts
		}}>
			{value}
		</button>
	{/each}
	<input class="border-0 px-2 py-0.5 bg-transparent print:hidden" type="text" list="accounts" id="account" placeholder="type then click include" bind:value={account} />
	<button class="mb-2 mr-2 text-sky-500 print:hidden" on:click={() => {
		if (account && $queryTrans.accounts.indexOf(account) == -1) {
			$queryTrans.accounts.push(account)
			$queryTrans.accounts = $queryTrans.accounts
			account = ''
		}
	}}>
		include
	</button>
	<br />
	<span class="text-gray-300">
		{JSON.stringify($queryTrans)}
	</span>
</div>

<div class="px-2 pb-4">
	<canvas bind:this={chartCanvas}></canvas>
</div>

<table class="w-full border rounded-lg">
  <thead>
    <tr>
      <td class="px-4 py-2 border-b">Date</td>
      <td class="px-4 py-2 border-b">Name</td>
      <td class="px-4 py-2 border-b">?</td>
    </tr>
  </thead>
  <tbody>
		{#each $trans as { ref, doc, ledger }, index (`tran-${ref}`)}
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