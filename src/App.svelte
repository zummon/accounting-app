<script>
	import { onMount } from "svelte";
	import { trans, names, accounts, refs } from "./lib/store";
	import Dashboard from "./routes/Dashboard.svelte";
	import Entry from "./routes/Entry.svelte";
	import TrialBalance from "./routes/TrialBalance.svelte";

	let gettingTrans = false;
	let route = "/";

	const getTrans = async () => {
		if (window.google) {
			google.script.run
				.withSuccessHandler((result) => {
					result = JSON.parse(result);
					$trans = result.data;
				})
				.withFailureHandler((err) => {})
				.getData();
		} else {
			await fetch(
				"https://script.google.com/macros/s/AKfycbyI1zS_-2zAga9_KQ-EiRUEr9mvA0l-WFixe8sPD1HzpGl42xCC7N45gZMPhDjf-zS8ew/exec?api=json"
			)
				.then((res) => {
					return res.json();
				})
				.then((json) => {
					$trans = json.data;
				});
		}
	};

	onMount(async () => {
		await getTrans();
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

<div class="flex flex-wrap justify-center px-2 pt-4 print:hidden">
	<button
		class="mb-4 mr-4 text-sky-500 disabled:text-gray-300"
		disabled={gettingTrans}
		on:click={async () => {
			gettingTrans = true;
			await getTrans().then(() => {
				gettingTrans = false;
			});
		}}
	>
		<svg
			class="h-8 w-8"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
			/>
		</svg>
	</button>
	<button
		class="mb-4 mr-4 text-sky-500"
		on:click={() => {
			route = "/";
		}}>Home</button
	>
	<button
		class="mb-4 mr-4 text-sky-500"
		on:click={() => {
			route = "/entry";
		}}>Entry</button
	>
	<button
		class="mb-4 mr-4 text-sky-500"
		on:click={() => {
			route = "/tb";
		}}>Trial Balance</button
	>
	<!-- <a href="/" class="mb-4 mr-4 text-sky-500"
		>income Statement</a
	>
	<a href="/" class="mb-4 mr-4 text-sky-500"
		>Balance Sheet</a
	> -->
	<button
		class="mb-2 text-sky-500"
		on:click={() => {
			print();
		}}
	>
		<svg
			class="h-8 w-8"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
			/>
		</svg>
	</button>
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

<a
	href="https://zummon.page/"
	target="_blank"
	class="mx-auto mt-2 block w-fit text-sky-500 print:hidden">Made by zummon</a
>
