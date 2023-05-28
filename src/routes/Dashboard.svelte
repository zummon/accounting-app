<script>
	import { subtotal, query } from "../lib/store";
	import { onMount } from "svelte";
	// import chartjs from 'chart.js/auto';

	let ref = "";
	let name = "";
	let account = "";

	// let ctx;
	// let chartCanvas;

	let grouptotal = {};

	$: {
		grouptotal = {};
		Object.entries($subtotal).forEach(([key, value]) => {
			let group = Number(key.charAt(0));
			let groupName = ["Asset", "Liability", `Owner's equity`, "Revenue"][
				group - 1
			];

			if (group >= 2 && group <= 4) {
				value = -value;
			}
			if (group >= 5) {
				groupName = "Expense";
			}

			if (grouptotal[groupName]) {
				grouptotal[groupName] += value;
			} else {
				grouptotal[groupName] = value;
			}
		});

		// accountType <= 1
		// accountType >= 2
		// accountType >= 5
	}

	// const updateChart = () => {
	// 	if (chartCanvas) chartCanvas.destroy()
	// 	ctx = document.getElementById('chart');
	// 	new chartjs(ctx, {
	// 		type: 'doughnut',
	// 		data: {
	// 			labels: Object.keys($subtotal),
	// 			datasets: [{
	// 				data: Object.values($subtotal),
	// 				backgroundColor: [
	// 					"rgb(255, 105, 96)",
	// 					"rgb(255, 142, 0)",
	// 					"rgb(255, 187, 51)",
	// 					"rgb(255, 223, 102)",
	// 					"rgb(255, 255, 153)"
	// 				],
	// 			}]
	// 		}
	// 	});
	// }

	onMount(async () => {});
</script>

<div class="px-2 pb-4">
	<span class="mb-2 mr-2 text-xl">Filter - Query</span>
	<button
		class="mb-2 mr-2 text-fuchsia-500 print:hidden"
		on:click={() => {
			$query.date.start = "";
			$query.date.end = "";
			$query.refs = [];
			$query.names = [];
			$query.accounts = [];
			ref = "";
			name = "";
			account = "";
		}}
	>
		Clear
	</button>
	<br />
	<abbr class="no-underline" title={$query.date.start}>
		<label class="mb-2 mr-2">
			<span class="mr-2">Start date:</span>
			<input
				class="border-0 bg-transparent px-2 py-0.5"
				type="datetime-local"
				bind:value={$query.date.start}
			/>
		</label>
	</abbr>
	<br />
	<abbr class="no-underline" title={$query.date.end}>
		<label class="mb-2 mr-2">
			<span class="mr-2">End date:</span>
			<input
				class="border-0 bg-transparent px-2 py-0.5"
				type="datetime-local"
				bind:value={$query.date.end}
			/>
		</label>
	</abbr>
	<br />
	<label class="mb-2 mr-2" for="ref">
		<span class="">Ref:</span>
	</label>
	{#each $query.refs as value, index (`query-ref-${index}`)}
		<button
			class="mb-2 mr-2 rounded-3xl border-2 border-fuchsia-500 px-2 py-0.5 text-fuchsia-500 print:border-gray-500 print:text-black"
			on:click={() => {
				$query.refs.splice(index, 1);
				$query.refs = $query.refs;
			}}
		>
			{value}
		</button>
	{/each}
	<input
		class="border-0 bg-transparent px-2 py-0.5 print:hidden"
		type="text"
		list="refs"
		id="ref"
		placeholder="type.."
		bind:value={ref}
		on:change={() => {
			if (ref && $query.refs.indexOf(ref) == -1) {
				$query.refs = [...$query.refs, ref];
				ref = "";
			}
		}}
	/>
	<br />
	<label class="mb-2 mr-2" for="name">
		<span class="mr-2">Name:</span>
	</label>
	{#each $query.names as value, index (`query-name-${index}`)}
		<button
			class="mb-2 mr-2 rounded-3xl border-2 border-fuchsia-500 px-2 py-0.5 text-fuchsia-500 print:border-gray-500 print:text-black"
			on:click={() => {
				$query.names.splice(index, 1);
				$query.names = $query.names;
			}}
		>
			{value}
		</button>
	{/each}
	<input
		class="border-0 bg-transparent px-2 py-0.5 print:hidden"
		type="text"
		list="names"
		id="name"
		placeholder="type.."
		bind:value={name}
		on:change={() => {
			if (name && $query.names.indexOf(name) == -1) {
				$query.names = [...$query.names, name];
				name = "";
			}
		}}
	/>
	<br />
	<label class="mb-2 mr-2" for="account">
		<span class="mr-2">Account:</span>
	</label>
	{#each $query.accounts as value, index (`query-account-${index}`)}
		<button
			class="mb-2 mr-2 rounded-3xl border-2 border-fuchsia-500 px-2 py-0.5 text-fuchsia-500 print:border-gray-500 print:text-black"
			on:click={() => {
				$query.accounts.splice(index, 1);
				$query.accounts = $query.accounts;
			}}
		>
			{value}
		</button>
	{/each}
	<input
		class="border-0 bg-transparent px-2 py-0.5 print:hidden"
		type="text"
		list="accounts"
		id="account"
		placeholder="type.."
		bind:value={account}
		on:change={() => {
			if (account && $query.accounts.indexOf(account) == -1) {
				$query.accounts = [...$query.accounts, account];
				account = "";
			}
		}}
	/>
</div>

<!-- <div class="px-2 pb-4">
	<canvas id="chart"></canvas>
</div> -->

<div class="px-2 pb-4">
	<table class="">
		<thead class="border-b">
			<tr>
				<td class="px-2 py-2">Group</td>
				<td class="px-2 py-2 text-right">Amount</td>
			</tr>
		</thead>
		<tbody>
			{#each Object.entries(grouptotal) as [key, value], index (`group-${index}`)}
				<tr class="border-b">
					<td class="px-2 py-2">{key}</td>
					<td class="px-2 py-2 text-right">{value}</td>
				</tr>
			{/each}
		</tbody>
		<!-- <tfoot class="">
      <tr>
        <td class="px-2 py-2">Balance</td>
        <td class="px-2 py-2 text-right">0</td>
      </tr>
    </tfoot> -->
	</table>
</div>
