<script>
	import { subtotal, loading, setData, trans } from "../lib/store";
	import { onMount } from "svelte";
	// import chartjs from 'chart.js/auto';

	// let ctx;
	// let chartCanvas;

	let grouptotal = {};

	// $: {
	// 	grouptotal = {};
	// 	Object.entries($subtotal).forEach(([key, value]) => {
	// 		let group = Number(key.charAt(0));
	// 		let groupName = ["Asset", "Liability", `Owner's equity`, "Revenue"][
	// 			group - 1
	// 		];

	// 		if (group >= 2 && group <= 4) {
	// 			value = -value;
	// 		}
	// 		if (group >= 5) {
	// 			groupName = "Expense";
	// 		}

	// 		if (grouptotal[groupName]) {
	// 			grouptotal[groupName] += value;
	// 		} else {
	// 			grouptotal[groupName] = value;
	// 		}
	// 	});

	// accountType <= 1
	// accountType >= 2
	// accountType >= 5
	// }

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

<!-- <div class="px-2 pb-4">
	<canvas id="chart"></canvas>
</div> -->

<!-- <div class="px-2 pb-4">
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
		<tfoot class="">
      <tr>
        <td class="px-2 py-2">Balance</td>
        <td class="px-2 py-2 text-right">0</td>
      </tr>
    </tfoot>
	</table>
</div> -->

<div class="container mx-auto flex flex-wrap gap-4">
	{#each $trans as tran, index (`tran-${index}`)}
		<div class="flex flex-col gap-2 rounded-lg px-4 py-3 shadow-md">
			<div class="">
				<abbr class="no-underline" title="Name">
					<input
						class="rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
						list="names"
						bind:value={tran.name} />
				</abbr>
			</div>
			<div class="w-full">
				<textarea
					class="w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
					rows="2"
					bind:value={tran.desc} />
			</div>
			<div class="flex justify-end gap-2">
				<div class="">
					<input
						class="rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
						type="datetime-local"
						bind:value={tran.date} />
				</div>
			</div>
			<div class="">
				<button
					class="rounded-full bg-green-500 px-4 py-2 text-lg font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-2 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500 disabled:bg-white disabled:text-green-500 disabled:shadow-none"
					disabled={$loading}
					on:click={async () => {
						await setData([tran]);
					}}>
					Save
				</button>

				<div class="">
					<span class="mr-2 inline-flex font-semibold">Account:</span>
					<span class="inline-flex font-semibold">Amount:</span>

					{#each tran.ledger as item, index (`ledger-${index}`)}
						<div class="">
							<label class="">
								<input
									class="rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
									type="text"
									list="accounts"
									bind:value={item.account} />
							</label>
							<label class="">
								<input
									class="rounded-md border-0 py-2 text-right text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
									type="number"
									bind:value={item.amount} />
							</label>
							<button
								class="text-sky-500"
								on:click={() => {
									tran.ledger.splice(index, 1);
									tran.ledger = tran.ledger;
								}}>
								<!-- x-mark outline heroicons -->
								<svg
									class="h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					{/each}
					<div class="">
						<button
							class="rounded-full bg-green-500 px-4 py-2 text-lg font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-2 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500"
							on:click={() => {
								tran.ledger = [{}, {}, ...tran.ledger];
							}}>
							Add
						</button>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
