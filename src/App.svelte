<script>
	import "chart.js/auto";
	import { onMount } from "svelte";
	import {
		loading,
		date,
		warnings,
		trans,
		names,
		accounts,
		keys,
	} from "./lib/store";
	import { Doughnut } from "svelte-chartjs";
	import { v4 as uuidv4 } from "uuid";
	import { getData, setData } from "./lib/function";

	let tran = {};

	$: group = $trans.reduce((prev, item) => {
		let value = item.amount;
		let groupName = item.group;

		if (item.absolute) {
			value = -value;
		}

		if (prev[groupName]) {
			prev[groupName] += value;
		} else {
			prev[groupName] = value;
		}
		return prev;
	}, {});

	onMount(() => {
		getData();
	});
</script>

<datalist id="keys">
	{#each $keys as value, index (`keys-${index}`)}
		<option {value} />
	{/each}
</datalist>
<datalist id="names">
	{#each $names as value, index (`names-${index}`)}
		<option {value} />
	{/each}
</datalist>
<datalist id="accounts">
	{#each $accounts as value, index (`accounts-${index}`)}
		<option {value} />
	{/each}
</datalist>

<div class="container mx-auto p-4">
	<div
		class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
		<div class="">
			{#key group}
				<Doughnut
					data={{
						labels: Object.keys(group),
						datasets: [
							{
								data: Object.values(group),
								backgroundColor: [
									"rgb(255, 105, 96)",
									"rgb(255, 142, 0)",
									"rgb(255, 187, 51)",
									"rgb(255, 223, 102)",
									"rgb(255, 255, 153)",
								],
							},
						],
					}} />
			{/key}
		</div>
		<div class="">
			<div class="text-lg font-semibold">?</div>
		</div>
	</div>
</div>

<div class="container mx-auto p-4">
	<div class="flex flex-wrap items-center justify-center">
		<div class="flex gap-4">
			<button
				class="rounded-full p-2 text-green-500"
				type="button"
				on:click={() => {
					tran.key = uuidv4();
				}}>
				<!-- heroicons solid key -->
				<svg
					class="h-6 w-6"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 00-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 00.75-.75v-1.5h1.5A.75.75 0 009 19.5V18h1.5a.75.75 0 00.53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1015.75 1.5zm0 3a.75.75 0 000 1.5A2.25 2.25 0 0118 8.25a.75.75 0 001.5 0 3.75 3.75 0 00-3.75-3.75z"
						clip-rule="evenodd" />
				</svg>
			</button>
			<input
				class="w-12 rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
				type="text"
				list="keys"
				bind:value={tran.key} />
		</div>
		<input
			class="rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
			type="datetime-local"
			bind:value={tran.date} />
		<input
			class="rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
			type="text"
			list="names"
			bind:value={tran.name} />
		<textarea
			class="w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
			rows="2"
			bind:value={tran.desc} />
		<button
			class="rounded-full bg-green-500 px-4 py-2 font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-2 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500 disabled:bg-white disabled:text-green-500 disabled:shadow-none"
			type="button"
			on:click={() => {
				setData([tran]);
			}}>
			<!-- cloud-arrow-down solid heroicons -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="h-6 w-6">
				<path
					fill-rule="evenodd"
					d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.25 6a.75.75 0 00-1.5 0v4.94l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V9.75z"
					clip-rule="evenodd" />
			</svg>
		</button>
		<button
			class="rounded-full bg-green-500 px-4 py-2 font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-1 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500"
			type="button"
			on:click={() => {
				tran = {};
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
	<div class="">
		{#if tran.ledger}
			<div class="">
				<div class="text-lg font-semibold">Ledger</div>
				<div class="">
					{#each tran.ledger as item, index (`tran-ledger-${index}`)}
						<div class="grid grid-cols-2">
							<input
								class="w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
								type="text"
								list="accounts"
								bind:value={item.account} />
							<input
								class="w-full rounded-md border-0 px-3 py-2 text-right text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
								type="number"
								bind:value={item.amount} />
							<button
								class="text-fuchsia-500"
								type="button"
								on:click={() => {
									// item.ledger.splice(index, 1);
									// item.ledger = item.ledger;
									item.account = null;
									item.amount = null;
									// itemSec.ref = null;
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
					<button
						class="rounded-full bg-green-500 px-4 py-2 text-lg font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-2 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500"
						type="button"
						on:click={() => {
							tran.ledger = [
								{ ref: uuidv4() },
								{ ref: uuidv4() },
								...tran.ledger,
							];
						}}>
						<!-- plus outline heroicons -->
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
								d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
					</button>
				</div>
			</div>
		{/if}
	</div>
	<div class="">
		{#each $trans as item, index (`trans-${index}`)}
			<button
				class="w-16 truncate"
				type="button"
				on:click={() => {
					tran = item;
				}}>{item.date} {item.name} {item.desc}</button>
		{/each}
	</div>
</div>

<a
	href="https://zummon.page/"
	target="_blank"
	class="mx-auto block w-fit p-4 text-green-500 print:hidden">Made by zummon</a>
