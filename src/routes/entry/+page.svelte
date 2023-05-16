<script>
	import { trans } from "../lib/store";
	import { onMount } from "svelte";

	// let entry = {};
	// let duty = "";

	// const getEntry = (event) => {
	// 	const orgRef = Object.keys($trans)[0];
	// 	let ref = orgRef;
	// 	if (event) {
	// 		ref = event.target.value;
	// 	}
	// 	let tran = $trans[ref];
	// 	if (!tran) {
	// 		tran = $trans[orgRef];
	// 	}
	// 	entry = { ...tran, doc: [ref, ...tran.doc] };
	// };

	onMount(async () => {

		// getEntry();
	});
</script>

<!-- <div class="px-2 pt-2">
	<h1 class="mb-2 text-xl font-medium">Entry</h1>
	<label class="mb-2 mr-2 inline-flex items-center border">
		<span class="mr-2 font-semibold">Ref:</span>
		<input
			on:input={getEntry}
			value={entry.doc[0]}
			type="text"
			list="refs"
			class=""
		/>
	</label>

	<label class="mb-2 mr-2 inline-flex items-center border">
		<span class="mr-2 font-semibold">Date:</span>
		<input bind:value={entry.doc[1]} type="date" class="" />
	</label>

	<label class="mb-2 mr-2 inline-flex items-center border">
		<span class="mr-2 font-semibold">To/From:</span>
		<input bind:value={entry.doc[2]} type="text" list="names" class="" />
	</label>

	<label class="mb-2 inline-flex border">
		<span class="mr-2 font-semibold">Description:</span>
		<textarea bind:value={entry.doc[3]} class="" />
	</label>

	<hr />

	<span class="mr-2 inline-flex font-semibold">Account:</span>
	<span class="inline-flex font-semibold">Amount:</span>

	{#each entry.ledger as [account, amount], index (`ledger-${index}`)}
		<div class="">
			<label class="mb-2 mr-2 inline-flex items-center border">
				<input bind:value={account} type="text" list="accounts" class="" />
			</label>

			<label class="mb-2 inline-flex items-center border">
				<input bind:value={amount} type="number" class="text-right" />
			</label>
		</div>
	{/each}
</div> -->
