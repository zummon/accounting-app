<script>
	import { trans } from "../lib/store";
	import { onMount } from "svelte";

	let name = []
	let filterData = []

	const filtering = () => {
		$trans
	};

	onMount(async () => {

	});
</script>

<div class="text-center">
	<span class="">transactions: </span>
	<span class="">{$trans.length}</span>
</div>

<div class="px-2 pt-2">
	<h1 class="mb-2 text-xl font-medium">Entry</h1>
	<label class="mb-2 mr-2 inline-flex items-center border">
		<span class="mr-2 font-semibold">Ref: </span>
		<input
			class=""
			type="text"
			list="refs"
		/>
	</label>

	<label class="mb-2 mr-2 inline-flex items-center border">
		<span class="mr-2 font-semibold">Date:</span>
		<input class="" type="date" bind:value={entry.doc[1]} />
	</label>

	<label class="mb-2 mr-2 inline-flex items-center border">
		<span class="mr-2 font-semibold">Name:</span>
		<input class="" type="text" list="names" bind:value={entry.doc[2]} />
	</label>

	<label class="mb-2 inline-flex border">
		<span class="mr-2 font-semibold">Description:</span>
		<textarea class="" bind:value={entry.doc[3]} />
	</label>

	<hr />

	<span class="mr-2 inline-flex font-semibold">Account:</span>
	<span class="inline-flex font-semibold">Amount:</span>

	{#each entry.ledger as { account, amount }, index (`ledger-${index}`)}
		<div class="">
			<label class="mb-2 mr-2 inline-flex items-center border">
				<input class="" type="text" list="accounts" bind:value={account} />
			</label>

			<label class="mb-2 inline-flex items-center border">
				<input class="text-right" type="number" bind:value={amount} />
			</label>
		</div>
	{/each}
</div>
