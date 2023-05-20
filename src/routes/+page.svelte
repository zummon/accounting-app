<script>
	import { trans } from "../lib/store";
	import { onMount } from "svelte";

	let name = []
	let filterData = []
	let select = {doc:[],ledger:[]}

	onMount(async () => {
		filterData = $trans
		
	});
</script>

<div class="px-2 pt-2">
	<h1 class="mb-2 text-xl font-medium">Search</h1>
	<label class="mb-2 mr-2 inline-flex items-center border rounded-lg">
		<span class="mx-2 font-semibold">Ref: </span>
		<input
			class="border-0 rounded-lg"
			type="text"
			list="refs"
			bind:value={select.ref} 
		/>
	</label>

	{#each select.doc as { date, name, desc }, index (`doc-${index}`)}
		<label class="mb-2 mr-2 inline-flex items-center border">
			<span class="mr-2 font-semibold">Date:</span>
			<input class="border-0" type="date" bind:value={date} />
		</label>

		<label class="mb-2 mr-2 inline-flex items-center border">
			<span class="mr-2 font-semibold">Name:</span>
			<input class="border-0" type="text" list="names" bind:value={name} />
		</label>

		<label class="mb-2 inline-flex border">
			<span class="mr-2 font-semibold">Description:</span>
			<textarea class="border-0" bind:value={desc} />
		</label>
	{/each}

	<hr />

	<span class="mr-2 inline-flex font-semibold">Account:</span>
	<span class="inline-flex font-semibold">Amount:</span>

	{#each select.ledger as { account, amount }, index (`ledger-${index}`)}
		<div class="">
			<label class="mb-2 mr-2 inline-flex items-center border">
				<input class="border-0" type="text" list="accounts" bind:value={account} />
			</label>

			<label class="mb-2 inline-flex items-center border">
				<input class="text-right border-0" type="number" bind:value={amount} />
			</label>
		</div>
	{/each}
</div>

<table class="w-full border border-blue-500 rounded-lg">
  <thead>
    <tr>
      <th class="px-4 py-2 border-b border-blue-500">Date</th>
      <th class="px-4 py-2 border-b border-blue-500">Name</th>
      <th class="px-4 py-2 border-b border-blue-500">?</th>
    </tr>
  </thead>
  <tbody>
		{#each filterData as { ref, doc, ledger }, index (`data-${ref}`)}
			<tr class={index % 2 ? '' : 'bg-gray-50'}>
				<td class="px-4 py-2 border-b border-blue-500">{new Date(doc[0].date).toDateString()}</td>
				<td class="px-4 py-2 border-b border-blue-500">{doc[0].name}</td>
				<td class="px-4 py-2 border-b border-blue-500">{''}</td>
			</tr>
		{/each}
  </tbody>
	<tfoot>
    <tr>
      <td class="px-4 py-2 text-right">Total</td>
      <td class="px-4 py-2 text-right">Total</td>
      <td class="px-4 py-2 text-right">Total</td>
    </tr>
  </tfoot>
</table>