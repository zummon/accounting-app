<script>
	import { trans, queryTrans } from "../lib/store";
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
		$queryTrans.date.start = ''
		$queryTrans.date.end = ''
		$queryTrans.refs = []
		$queryTrans.names = []
		$queryTrans.accounts = []
		ref = ''
		name = ''
		account = ''
	}}>
		Clear
	</button>
	<br />
	<abbr class="no-underline" title={$queryTrans.date.start}>
		<label class="mb-2 mr-2">
			<span class="mr-2">
				Start date:
			</span>
			<input class="border-0 px-2 py-0.5 bg-transparent" type="datetime-local" bind:value={$queryTrans.date.start} />
		</label>
	</abbr>
	<br />
	<abbr class="no-underline" title={$queryTrans.date.end}>
		<label class="mb-2 mr-2">
			<span class="mr-2">End date:</span>
			<input class="border-0 px-2 py-0.5 bg-transparent" type="datetime-local" bind:value={$queryTrans.date.end} />
		</label>
	</abbr>
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
	<input class="border-0 px-2 py-0.5 bg-transparent print:hidden" type="text" list="refs" id="ref" placeholder="type.." bind:value={ref} on:change={() => {
		if (ref && $queryTrans.refs.indexOf(ref) == -1) {
			$queryTrans.refs = [...$queryTrans.refs, ref]
			ref = ''
		}
	}} />
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
	<input class="border-0 px-2 py-0.5 bg-transparent print:hidden" type="text" list="names" id="name" placeholder="type.." bind:value={name} on:change={() => {
		if (name && $queryTrans.names.indexOf(name) == -1) {
			$queryTrans.names = [...$queryTrans.names, name]
			name = ''
		}
	}} />
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
	<input class="border-0 px-2 py-0.5 bg-transparent print:hidden" type="text" list="accounts" id="account" placeholder="type.." bind:value={account} on:change={() => {
		if (account && $queryTrans.accounts.indexOf(account) == -1) {
			$queryTrans.accounts = [...$queryTrans.accounts, account]
			account = ''
		}
	}} />
</div>

<div class="px-2 pb-4">
	<canvas bind:this={chartCanvas}></canvas>
</div>
