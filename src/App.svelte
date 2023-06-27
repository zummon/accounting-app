<script>
	import "chart.js/auto";
	import { onMount } from "svelte";
	import { Doughnut, Bar } from "svelte-chartjs";
	import { v4 as uuidv4 } from "uuid";

	const getData = () => {
		loading = true;
		google.script.run
			.withSuccessHandler((result) => {
				result = JSON.parse(result);
				trans = result.data;
				date = new Date(result.date);
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

	let tran = {};
	let showTrans = false;
	let date = new Date();
	let loading = true;
	let warnings = [];
	let trans = [];
	let accounts = {};
	let names = {};
	let error = "";
	let route = "";
	let source = {
		"": ["1S9bRkCnI-rVvy4ZxcVPejWBiNpw2lMJeVcOXq_t66Rs"],
		invoice: ["1fFGmZnAJjNvyuF8gC-KuvGKmwj4OtpDu07abKh2i2As"],
		accounts: ["1UydCQCoylxCiooiGLYlH_EbFkoKq9eiL8iinB03c37k"],
		names: ["108gT2so0W2R6uEXpsMigngr_4yzFq6NKddQKCziGcCg"],
	};
	let warningElement;

	$: keys = trans.map((item) => item.key);

	$: pieData = trans.reduce((prev, curr) => {
		if (Array.isArray(curr.ledger)) {
			curr.ledger.forEach((itemSec) => {
				let seted = accounts[itemSec.account];
				let value = itemSec.amount;
				let groupAccount = seted.group;
				let absolute = seted.absolute;

				if (absolute) {
					value = -value;
				}
				if (groupAccount) {
					if (prev[groupAccount]) {
						prev[groupAccount] += value;
					} else {
						prev[groupAccount] = value;
					}
				}
			});
		}
		return prev;
	}, {});

	$: barData = trans.reduce((prev, item) => {
		let date = new Date(item.date);
		if (Array.isArray(item.ledger)) {
			item.ledger.forEach((itemSec) => {
				let seted = accounts[itemSec.account];
				let value = itemSec.amount;
				let yearMonth = `${date.getFullYear()}/${date.getMonth() + 1}`;
				let groupAccount = seted.group;
				let absolute = seted.absolute;

				if (absolute) {
					value = -value;
				}

				if (groupAccount == "Revenues") {
					if (prev[yearMonth]) {
						prev[yearMonth] += value;
					} else {
						prev[yearMonth] = value;
					}
				}
			});
		}
		return prev;
	}, {});

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

<dialog class="" bind:this={warningElement}>
	<div
		class="rounded-lg bg-white p-4 shadow-2xl ring-1 ring-gray-500 dark:bg-gray-800 dark:text-white">
		<div class="mb-4 flex gap-2">
			<div class="grow font-semibold text-fuchsia-500">Warnings</div>
			<button
				class="text-fuchsia-500"
				type="button"
				on:click={() => {
					warningElement.close();
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
		<ol class="list-decimal">
			{#each warnings as item, index (`warnings-${index}`)}
				<li class="">{item}</li>
			{/each}
		</ol>
	</div>
</dialog>

<div class="flex flex-wrap items-center justify-end p-4">
	<div class="grow">
		<span class="font-semibold">Accounting App</span>
		<span class="font-semibold text-fuchsia-500" class:hidden={!error}>
			{error}
		</span>
		<button
			class="inline-flex items-center gap-2 {loading
				? 'text-gray-500'
				: 'text-green-500'}"
			class:hidden={error}
			type="button"
			on:click={() => {
				getData();
			}}>
			<span class="">
				{date.toLocaleDateString(undefined, {
					day: "numeric",
					month: "short",
					year: "numeric",
					hour: "2-digit",
					minute: "2-digit",
				})}
			</span>
			<span class="print:hidden">
				<!-- arrow-path mini heroicons -->
				<svg
					class="h-5 w-5"
					class:animate-spin={loading}
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
	<div class="print:hidden">
		<button
			class="rounded-full px-4 py-2 font-semibold shadow-fuchsia-200 transition duration-300 hover:text-fuchsia-500 hover:shadow-none hover:ring-1 hover:ring-fuchsia-500 focus:text-fuchsia-500 focus:shadow-none focus:ring-2 focus:ring-fuchsia-500 dark:shadow-fuchsia-800 {warnings[0]
				? 'bg-fuchsia-500 text-white shadow-md hover:bg-white focus:bg-white'
				: 'bg-transparent text-gray-500 shadow-none'}"
			type="button"
			on:click={() => {
				warningElement.showModal();
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
	<div
		class="mb-4 flex flex-wrap items-center justify-center gap-4"
		class:hidden={route !== ""}>
		<div class="aspect-video h-80">
			<Doughnut
				data={{
					labels: Object.keys(pieData),
					datasets: [
						{
							data: Object.values(pieData),
							backgroundColor: [
								"rgb(255, 105, 96)",
								"rgb(255, 142, 0)",
								"rgb(255, 187, 51)",
								"rgb(255, 223, 102)",
								"rgb(255, 255, 153)",
							],
							borderWidth: 0,
						},
					],
				}}
				options={{ plugins: { legend: false } }} />
		</div>
		<div class="aspect-video h-80">
			<Bar
				data={{
					labels: Object.keys(barData),
					datasets: [
						{
							data: Object.values(barData),
							backgroundColor: [
								"rgb(135, 206, 235)",
								"rgb(128, 216, 255)",
								"rgb(160, 233, 255)",
								"rgb(176, 224, 255)",
								"rgb(224, 255, 255)",
							],
						},
					],
				}}
				options={{ plugins: { legend: false } }} />
		</div>
	</div>
	<div class="mb-4 flex flex-wrap items-center justify-center gap-4">
		<button
			class="flex flex-col items-center justify-center p-4 shadow"
			on:click={() => {
				route = "";
			}}>
			<div class="">
				<!-- chart-bar solid heroicons -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="h-12 w-12">
					<path
						d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
				</svg>
			</div>
			<div class="font-semibold">Dashboard</div>
		</button>
		<button
			class="flex flex-col items-center justify-center p-4 shadow"
			on:click={() => {
				route = "ledger";
			}}>
			<div class="">
				<!-- book-open solid heroicons -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="h-12 w-12">
					<path
						d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
				</svg>
			</div>
			<div class="font-semibold">Ledger</div>
		</button>
		<button
			class="flex flex-col items-center justify-center p-4 shadow"
			on:click={() => {
				route = "invoice";
			}}>
			<div class="">
				<!-- clipboard-document solid heroicons -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="h-12 w-12">
					<path
						fill-rule="evenodd"
						d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
						clip-rule="evenodd" />
					<path
						fill-rule="evenodd"
						d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"
						clip-rule="evenodd" />
				</svg>
			</div>
			<div class="font-semibold">invoice</div>
		</button>
	</div>
	<div
		class="flex flex-wrap items-center justify-center gap-4"
		class:hidden={route !== "ledger"}>
		<div class="mb-4 flex flex-wrap items-center justify-center gap-2">
			<input
				class="rounded-full border-0 bg-transparent px-3 py-2 shadow-sm ring-1 ring-gray-500 focus:ring-2 focus:ring-green-500 disabled:text-gray-500"
				type="text"
				list="keys"
				disabled
				bind:value={tran.key} />
			<input
				class="rounded-full border-0 bg-transparent px-3 py-2 shadow-sm ring-1 ring-gray-500 focus:ring-2 focus:ring-green-500"
				type="datetime-local"
				bind:value={tran.date} />
			<input
				class="rounded-full border-0 bg-transparent px-3 py-2 shadow-sm ring-1 ring-gray-500 focus:ring-2 focus:ring-green-500"
				type="text"
				list="names"
				bind:value={tran.name} />
			<textarea
				class="grow rounded-full border-0 bg-transparent px-3 py-2 shadow-sm ring-1 ring-gray-500 focus:ring-2 focus:ring-green-500"
				rows="1"
				bind:value={tran.desc} />
			<input
				class="rounded-full border-0 bg-transparent px-3 py-2 shadow-sm ring-1 ring-gray-500 focus:ring-2 focus:ring-green-500"
				type="text"
				list="names"
				bind:value={tran.belongTo} />
		</div>
		<div class="mb-4">
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
							<div class="text-gray-500">
								{accounts[item.account] ? accounts[item.account].group : ""}
							</div>
							<input
								class="rounded-full border-0 bg-transparent px-3 py-2 shadow-sm ring-1 ring-gray-500 focus:ring-2 focus:ring-green-500"
								type="text"
								list="accounts"
								bind:value={item.account} />
							<input
								class="rounded-full border-0 bg-transparent px-3 py-2 text-right shadow-sm ring-1 ring-gray-500 focus:ring-2 focus:ring-green-500"
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
					class="inline-flex gap-2 rounded-full bg-green-500 px-4 py-2 font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-1 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500 dark:shadow-green-800"
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
			<div
				class="rounded-lg bg-white p-4 shadow-2xl ring-1 ring-gray-500 dark:bg-gray-800 dark:text-white">
				<div class="mb-4 flex gap-2">
					<div class="grow font-semibold">Transactions</div>
					<button
						class=""
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
								<div class="max-w-lg grow truncate">
									<span class="">
										{new Date(item.date).toDateString()}
									</span>
									<span class="">
										{item.name}
									</span>
									<span class="">
										{item.desc}
									</span>
								</div>
							</button>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
	<div
		class="flex flex-wrap items-center justify-center gap-4"
		class:hidden={route !== "invoice"}>
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
					class="inline-flex gap-2 rounded-full bg-green-500 px-4 py-2 font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-1 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500 dark:shadow-green-800"
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
	<div class="mb-4 mt-4 flex flex-wrap items-center justify-center gap-2">
		<button
			class="rounded-full bg-green-500 px-4 py-2 font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-1 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500 dark:shadow-green-800"
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
			class="rounded-full bg-green-500 px-4 py-2 font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-1 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500 dark:shadow-green-800"
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
	<div class="flex flex-wrap items-center justify-center gap-2">
		<button
			class="rounded-full bg-green-500 px-4 py-2 font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-1 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500 disabled:bg-transparent disabled:text-gray-500 disabled:shadow-none dark:shadow-green-800"
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
			class="rounded-full bg-fuchsia-500 px-4 py-2 font-semibold text-white shadow-md shadow-fuchsia-200 transition duration-300 hover:bg-white hover:text-fuchsia-500 hover:shadow-none hover:ring-1 hover:ring-fuchsia-500 focus:bg-white focus:text-fuchsia-500 focus:shadow-none focus:ring-2 focus:ring-fuchsia-500 dark:shadow-fuchsia-800"
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

<div class="p-4 text-center print:hidden">
	Made by zummon (Teerapat Anantarattanachai)
</div>
