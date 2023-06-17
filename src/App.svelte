<script>
	import "chart.js/auto";
	import { onMount } from "svelte";
	import { Doughnut, Bar } from "svelte-chartjs";
	import { v4 as uuidv4 } from "uuid";

	let tran = {};
	let group = {};
	let showWarning = false;
	let pair = {};
	let showTrans = false;
	let source = {
		"": ["1S9bRkCnI-rVvy4ZxcVPejWBiNpw2lMJeVcOXq_t66Rs"],
		invoice: ["1fFGmZnAJjNvyuF8gC-KuvGKmwj4OtpDu07abKh2i2As"],
		accounts: ["1UydCQCoylxCiooiGLYlH_EbFkoKq9eiL8iinB03c37k"],
		names: ["108gT2so0W2R6uEXpsMigngr_4yzFq6NKddQKCziGcCg"],
	};
	let date = new Date().toJSON();
	let loading = true;
	let warnings = [];
	let trans = [];
	let accounts = {};
	let names = {};
	let error = "";

	const getData = () => {
		loading = true;
		google.script.run
			.withSuccessHandler((result) => {
				result = JSON.parse(result);
				trans = result.data;
				date = result.date;
				warnings = result.warnings;
				accounts = result.dataset.accounts;
				names = result.dataset.names;
				loading = false;
			})
			.withFailureHandler((result) => {
				error = result.message;
			})
			.getData({ source });
	};

	const setData = (data) => {
		loading = true;
		data = JSON.stringify(data);
		google.script.run
			.withSuccessHandler((result) => {
				result = JSON.parse(result);
				date = result.date;
				warnings = result.warnings;
				loading = false;
			})
			.withFailureHandler((result) => {
				error = result.message;
			})
			.setData({ source, data });
	};

	$: {
		group = {};
		trans.forEach((item) => {
			if (Array.isArray(item.ledger)) {
				item.ledger.forEach((itemSec) => {
					let value = itemSec.amount;
					let groupAccount = accounts[itemSec.account].group;

					if (itemSec.absolute) {
						value = -value;
					}
					if (groupAccount) {
						if (group[groupAccount]) {
							group[groupAccount] += value;
						} else {
							group[groupAccount] = value;
						}
					}
				});
			}
		});
	}

	$: keys = trans.map((item) => item.key);

	// $: {
	// 	pair = {};
	// 	$trans.forEach((item) => {
	// 		let date = new Date(item.date)
	// 		if (Array.isArray(item.ledger)) {
	// 			item.ledger.forEach((itemSec) => {
	// 				let value = itemSec.amount;
	// 				let yearMonth = `${date.getFullYear()}-${date.getMonth()}`

	// 				if (itemSec.absolute) {
	// 					value = -value;
	// 				}

	// 				if (["4 Revenues", "5 Expenses"].includes(itemSec.group)) {
	// 					if (pair[itemSec.group]) {
	// 						pair[itemSec.group] += value;
	// 					} else {
	// 						pair[itemSec.group] = value;
	// 					}
	// 				}
	// 			});
	// 		}
	// 	});
	// }

	onMount(() => {
		getData();
	});
</script>

<datalist id="keys">
	{#each keys as value, index (`keys-${index}`)}
		<option {value} />
	{/each}
</datalist>
<datalist id="names">
	{#each Object.keys(names) as value, index (`names-${index}`)}
		<option {value} />
	{/each}
</datalist>
<datalist id="accounts">
	{#each Object.keys(accounts) as value, index (`accounts-${index}`)}
		<option {value} />
	{/each}
</datalist>

<dialog class="bg-transparent" open={error}>
	<div
		class="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-300 dark:bg-gray-800 dark:text-white">
		<div class="font-semibold text-fuchsia-500">
			{error}
		</div>
	</div>
</dialog>

<dialog class="bg-transparent" open={showWarning}>
	<div
		class="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-300 dark:bg-gray-800 dark:text-white">
		<div class="mb-4 flex gap-2">
			<div class="grow font-semibold">Warnings</div>
			<button
				class="text-fuchsia-500"
				type="button"
				on:click={() => {
					showWarning = false;
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
		<ul class="">
			{#each warnings as item, index (`warnings-${index}`)}
				<li class="">{item}</li>
			{/each}
		</ul>
	</div>
</dialog>

<dialog class="bg-transparent" open={showTrans}>
	<div class="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-300">
		<div class="mb-4 flex gap-2">
			<div class="grow font-semibold">Transactions</div>
			<button
				class="text-fuchsia-500"
				type="button"
				on:click={() => {
					showTrans = false;
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
			{#each trans as item, index (`trans-${index}`)}
				<div class="mb-2 flex gap-2">
					<button
						class="flex items-center gap-2 text-green-500"
						type="button"
						on:click={() => {
							tran = item;
							showTrans = false;
						}}>
						<span class="">
							<!-- pencil solid heroicons -->
							<svg
								class="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor">
								<path
									d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
							</svg>
						</span>
						<span class="max-w-lg grow truncate">
							<span class="">
								{new Date(item.date).toDateString()}
							</span>
							<span class="">
								{item.name}
							</span>
							<span class="">
								{item.desc}
							</span>
						</span>
					</button>
				</div>
			{/each}
		</div>
	</div>
</dialog>

<div class="flex flex-wrap items-center justify-end p-4">
	<div class="grow font-semibold">
		<span class="">Accounting App</span>
		<button
			class="inline-flex items-center gap-2 text-green-500 disabled:text-gray-500"
			type="button"
			disabled={loading}
			on:click={() => {
				getData();
			}}>
			<span class="">
				{new Date(date).toLocaleDateString()}
			</span>
			<span class="">
				{new Date(date).toLocaleTimeString()}
			</span>
			<span class="">
				<!-- arrow-path mini heroicons -->
				<svg
					class="h-5 w-5"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
						clip-rule="evenodd" />
				</svg>
			</span>
		</button>
	</div>
	<div class="">
		<button
			class="rounded-full bg-green-500 px-4 py-2 font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-1 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500 disabled:bg-white disabled:text-gray-500 disabled:shadow-none"
			type="button"
			disabled={warnings.length == 0}
			on:click={() => {
				showWarning = true;
			}}>
			<!-- exclamation-triangle solid heroicons -->
			<svg
				class="h-6 w-6"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor">
				<path
					fill-rule="evenodd"
					d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
					clip-rule="evenodd" />
			</svg>
		</button>
	</div>
</div>

<div class="container mx-auto p-4">
	<div class="flex flex-wrap items-center justify-center gap-4">
		<div class="aspect-video">
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
					}}
					options={{ plugins: { legend: false } }} />
			{/key}
		</div>
		<div class="aspect-video">
			<!-- <Bar
				data={{
					labels: [],
					datasets: [
						{
							data: [],
							backgroundColor: ["rgb(98,  182, 239)"],
						},
						{
							data: [],
							backgroundColor: ["rgb(170, 128, 252)"],
						},
					],
				}}
				options={{ plugins: { legend: false } }} /> -->
		</div>
	</div>
</div>

<div class="container mx-auto p-4">
	<div class="mb-4 flex flex-wrap items-center justify-center gap-2">
		<button
			class="rounded-full bg-green-500 px-4 py-2 font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-1 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500"
			type="button"
			on:click={() => {
				tran = { key: uuidv4() };
			}}>
			<!-- plus solid heroicons -->
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
		<button
			class="rounded-full bg-green-500 px-4 py-2 font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-1 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500"
			on:click={() => {
				showTrans = true;
			}}>
			<!-- magnifying-glass outline heroicons -->
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
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
			</svg>
		</button>
	</div>
	<div class="mb-4 flex flex-wrap items-center justify-center gap-2">
		<input
			class="rounded-full border-0 bg-transparent px-3 py-2 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500 disabled:text-gray-500"
			type="text"
			list="keys"
			disabled
			bind:value={tran.key} />
		<input
			class="rounded-full border-0 bg-transparent px-3 py-2 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
			type="datetime-local"
			bind:value={tran.date} />
		<input
			class="rounded-full border-0 bg-transparent px-3 py-2 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
			type="text"
			list="names"
			bind:value={tran.name} />
		<textarea
			class="grow rounded-full border-0 bg-transparent px-3 py-2 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
			rows="1"
			bind:value={tran.desc} />
		<input
			class="rounded-full border-0 bg-transparent px-3 py-2 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
			type="text"
			list="names"
			bind:value={tran.belongTo} />
	</div>
	<div class="mb-4 flex flex-wrap justify-center gap-2">
		<div class="">
			{#if tran.ledger}
				<div class="mb-2 flex items-center justify-center gap-2 font-semibold">
					<button
						class="flex items-center gap-2 text-green-500"
						type="button"
						on:click={() => {
							tran.ledger = [
								{ key: uuidv4() },
								{ key: uuidv4() },
								...tran.ledger,
							];
						}}>
						<span class="">Ledger</span>
						<span class="">
							<!-- plus mini heroicons -->
							<svg
								class="h-5 w-5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
							</svg>
						</span>
					</button>
				</div>
				<div class="">
					{#each tran.ledger as item, index (`tran-ledger-${index}`)}
						<div class="mb-2 flex gap-2">
							<input
								class="rounded-full border-0 bg-transparent px-3 py-2 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
								type="text"
								list="accounts"
								bind:value={item.account} />
							<input
								class="rounded-full border-0 bg-transparent px-3 py-2 text-right shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
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
									// itemSec.key = null;
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
				</div>
			{:else}
				<button
					class="inline-flex gap-2 rounded-full bg-green-500 px-4 py-2 font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-1 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500"
					type="button"
					on:click={() => {
						tran.ledger = [{ key: uuidv4() }, { key: uuidv4() }];
					}}>
					<span class="">
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
					</span>
					<span class="">Ledger</span>
				</button>
			{/if}
		</div>
		<div class="">
			{#if tran.invoice}
				<div class="mb-2 flex items-center justify-center gap-2 font-semibold">
					<span class="">invoice</span>
				</div>
				<div class="max-w-lg">
					{JSON.stringify(tran.invoice)}
				</div>
			{:else}
				<button
					class="inline-flex gap-2 rounded-full bg-green-500 px-4 py-2 font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-1 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500"
					type="button"
					on:click={() => {
						tran.invoice = { key: uuidv4() };
					}}>
					<span class="">
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
					</span>
					<span class="">invoice</span>
				</button>
			{/if}
		</div>
	</div>
	<div class="flex flex-wrap items-center justify-center gap-2">
		<button
			class="rounded-full bg-green-500 px-4 py-2 font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-1 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500 disabled:bg-white disabled:text-gray-500 disabled:shadow-none"
			type="button"
			disabled={loading}
			on:click={() => {
				if (tran.key) {
					setData([tran]);
				}
			}}>
			<!-- cloud-arrow-down solid heroicons -->
			<svg
				class="h-6 w-6"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor">
				<path
					fill-rule="evenodd"
					d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.25 6a.75.75 0 00-1.5 0v4.94l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V9.75z"
					clip-rule="evenodd" />
			</svg>
		</button>
		<button
			class="rounded-full bg-fuchsia-500 px-4 py-2 font-semibold text-white shadow-md shadow-fuchsia-200 transition duration-300 hover:bg-white hover:text-fuchsia-500 hover:shadow-none hover:ring-1 hover:ring-fuchsia-500 focus:bg-white focus:text-fuchsia-500 focus:shadow-none focus:ring-2 focus:ring-fuchsia-500"
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
</div>

<div class="flex flex-wrap p-4">
	<div class="">
		<a class="text-green-500" href="https://zummon.page/" target="_blank">
			Made by zummon
		</a>
	</div>
</div>
