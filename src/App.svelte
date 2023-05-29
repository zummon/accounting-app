<script>
	import { onMount } from "svelte";
	import {
		getData,
		names,
		accounts,
		refs,
		loading,
		query,
		setData,
		trans,
	} from "./lib/store";
	import Dashboard from "./routes/Dashboard.svelte";
	import Entry from "./routes/Entry.svelte";
	import TrialBalance from "./routes/TrialBalance.svelte";

	let route = "/";
	let ref = "";
	let name = "";
	let account = "";
	let entry = { ledger: [{}] };

	onMount(async () => {
		await getData();

		let index = $trans.length - 1;

		entry = $trans[index];
	});
</script>

<datalist id="refs">
	{#each $refs as value, index (`ref-${index}`)}
		<option {value} />
	{/each}
</datalist>
<datalist id="names">
	{#each $names as value, index (`name-${index}`)}
		<option {value} />
	{/each}
</datalist>
<datalist id="accounts">
	{#each $accounts as value, index (`account-${index}`)}
		<option {value} />
	{/each}
</datalist>

<div class="flex flex-wrap justify-center gap-4 px-2 py-4 print:hidden">
	<button
		class="rounded-full bg-green-500 px-4 py-2 text-lg font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-2 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500 disabled:bg-white disabled:text-green-500 disabled:shadow-none"
		disabled={$loading}
		on:click={async () => {
			await getData();
		}}>
		<svg
			class="h-8 w-8"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
		</svg>
	</button>
	<button
		class="rounded-full bg-green-500 px-4 py-2 text-lg font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-2 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500"
		on:click={() => {
			route = "/";
		}}>Home</button>
	<button
		class="rounded-full bg-green-500 px-4 py-2 text-lg font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-2 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500"
		on:click={() => {
			route = "/entry";
		}}>Entry</button>
	<button
		class="rounded-full bg-green-500 px-4 py-2 text-lg font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-2 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500"
		on:click={() => {
			route = "/tb";
		}}>Trial Balance</button>
	<!-- <a href="/" class="mb-4 mr-4 text-sky-500"
		>income Statement</a
	>
	<a href="/" class="mb-4 mr-4 text-sky-500"
		>Balance Sheet</a
	> -->
	<button
		class="rounded-full bg-green-500 px-4 py-2 text-lg font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-2 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500"
		on:click={() => {
			print();
		}}>
		<svg
			class="h-8 w-8"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
		</svg>
	</button>
</div>

<div class="container mx-auto px-2 pb-4">
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
		}}>
		Clear
	</button>
	<div class="">
		<abbr class="no-underline" title={$query.date.start}>
			<label class="mb-2 mr-2">
				<span class="mr-2">Start date:</span>
				<input
					class="rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500"
					type="datetime-local"
					bind:value={$query.date.start} />
			</label>
		</abbr>
		<abbr class="no-underline" title={$query.date.end}>
			<label class="mb-2 mr-2">
				<span class="mr-2">End date:</span>
				<input
					class="rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500"
					type="datetime-local"
					bind:value={$query.date.end} />
			</label>
		</abbr>
	</div>
	<div
		class="rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500">
		<label class="mb-2 mr-2" for="ref">
			<span class="">Ref:</span>
		</label>
		{#each $query.refs as value, index (`query-ref-${index}`)}
			<button
				class="mb-2 mr-2 rounded-3xl border-2 border-fuchsia-500 px-2 py-0.5 text-fuchsia-500 print:border-gray-500 print:text-black"
				on:click={() => {
					$query.refs.splice(index, 1);
					$query.refs = $query.refs;
				}}>
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
			}} />
	</div>
	<div
		class="rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500">
		<label class="mb-2 mr-2" for="name">
			<span class="mr-2">Name:</span>
		</label>
		{#each $query.names as value, index (`query-name-${index}`)}
			<button
				class="mb-2 mr-2 rounded-3xl border-2 border-fuchsia-500 px-2 py-0.5 text-fuchsia-500 print:border-gray-500 print:text-black"
				on:click={() => {
					$query.names.splice(index, 1);
					$query.names = $query.names;
				}}>
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
			}} />
	</div>
	<div
		class="rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500">
		<label class="mb-2 mr-2" for="account">
			<span class="mr-2">Account:</span>
		</label>
		{#each $query.accounts as value, index (`query-account-${index}`)}
			<button
				class="mb-2 mr-2 rounded-3xl border-2 border-fuchsia-500 px-2 py-0.5 text-fuchsia-500 print:border-gray-500 print:text-black"
				on:click={() => {
					$query.accounts.splice(index, 1);
					$query.accounts = $query.accounts;
				}}>
				{value}
			</button>
		{/each}
		<input
			class="border-0 bg-transparent px-2 py-0.5 print:hidden"
			type="text"
			list="accounts"
			id="account"
			bind:value={account}
			on:change={() => {
				if (account && $query.accounts.indexOf(account) == -1) {
					$query.accounts = [...$query.accounts, account];
					account = "";
				}
			}} />
	</div>
</div>

<div class="container mx-auto">
	{#if route == "/entry"}
		<Entry />
	{:else if route == "/tb"}
		<TrialBalance />
	{:else}
		<Dashboard />
	{/if}
</div>

<div class="flex flex-wrap gap-4">
	{#each $trans as tran, index (`tran-${index}`)}
		<div class="flex flex-col gap-2 rounded-lg px-4 py-3 shadow-md">
			<div class="flex gap-2">
				<abbr class="no-underline" title="Name">
					<div class="" contenteditable="true" bind:textContent={tran.name} />
				</abbr>
			</div>
			<div class="">
				<div class="" contenteditable="true" bind:textContent={tran.desc} />
			</div>
			<div class="flex justify-end gap-2">
				<div class="">
					<input class="" type="datetime-local" bind:value={tran.date} />
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

					{#each entry.ledger as { ref, account, amount }, index (`ledger-${index}`)}
						<div class="">
							<label class="">
								<input
									class="w-12 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500"
									type="text"
									disabled
									bind:value={ref} />
							</label>
							<label class="">
								<input
									class="rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500"
									type="text"
									list="accounts"
									bind:value={account} />
							</label>
							<label class="">
								<input
									class="rounded-md border-0 py-2 text-right text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-500"
									type="number"
									bind:value={amount} />
							</label>
							<button
								class="text-sky-500"
								on:click={() => {
									entry.ledger.splice(index, 1);
									entry.ledger = entry.ledger;
								}}>
								Delete
							</button>
						</div>
					{/each}
					<div class="">
						<button
							class="rounded-full bg-green-500 px-4 py-2 text-lg font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-2 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500"
							on:click={() => {
								entry.ledger = [{}, {}, ...entry.ledger];
							}}>
							Add
						</button>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>

<a
	href="https://zummon.page/"
	target="_blank"
	class="mx-auto mt-2 block w-fit text-sky-500 print:hidden">Made by zummon</a>
