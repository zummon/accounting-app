<script>
	import { trans } from "../../lib/store";
	import { onMount } from "svelte";
	import { dev } from '$app/environment';

	let entry = { ledger: [{}] };

	const setEntry = () => {

		if (dev) {
			google.script.run.withSuccessHandler((array) => {

			}).withFailureHandler((err) => {
				
			}).setData([entry])
		}

	};

	onMount(async () => {
		let index = $trans.length - 1

		entry = $trans[index]
	});
</script>

<div class="px-2 pt-2">
	<h1 class="mb-2 text-xl font-medium">Entry</h1>

	<label class="mb-2 mr-2 inline-flex items-center border">
		<span class="mr-2 font-semibold">Ref:</span>
		<input class="w-16" type="text" list="refs" disabled bind:value={entry.ref} />
	</label>

	<label class="mb-2 mr-2 inline-flex items-center border">
		<span class="mr-2 font-semibold">Date:</span>
		<input class="" type="date" bind:value={entry.date} />
	</label>

	<label class="mb-2 mr-2 inline-flex items-center border">
		<span class="mr-2 font-semibold">name:</span>
		<input class="" type="text" list="names" bind:value={entry.name} />
	</label>

	<label class="mb-2 inline-flex border">
		<span class="mr-2 font-semibold">Description:</span>
		<textarea class="" bind:value={entry.desc} />
	</label>

	<hr />

	<button class="text-sky-500 mr-2" on:click={() => {
		entry.ledger.push({})
		entry.ledger.push({})
		entry.ledger = entry.ledger
	}}>
		Add
	</button>
	<span class="mr-2 inline-flex font-semibold">Account:</span>
	<span class="inline-flex font-semibold">Amount:</span>

	{#each entry.ledger as { ref, account, amount }, index (`ledger-${index}`)}
		<div class="">
			<label class="mb-2 mr-2 inline-flex items-center border">
				<input class="w-12" type="text" disabled bind:value={ref} />
			</label>

			<label class="mb-2 mr-2 inline-flex items-center border">
				<input class="" type="text" list="accounts" bind:value={account} />
			</label>

			<label class="mb-2 inline-flex items-center border">
				<input class="text-right" type="number" bind:value={amount} />
			</label>

			<button class="text-sky-500" on:click={() => { 
				entry.ledger.splice(index, 1)
				entry.ledger = entry.ledger
			}}>
				Delete
			</button>
		</div>
	{/each}

	<hr />

	<div class="text-center">
		<button class="text-sky-500" on:click={() => {
			setEntry()
		}}>
			Add
		</button>
	</div>
</div>

<table class="w-full border rounded-lg my-4">
  <thead>
    <tr>
      <td class="px-4 py-2 border-b">Date</td>
      <td class="px-4 py-2 border-b">Name</td>
      <td class="px-4 py-2 border-b text-right">?</td>
    </tr>
  </thead>
  <tbody>
		{#each $trans as { ref, date, name, ledger }, index (`tran-${ref}`)}
			<tr class={index % 2 ? '' : 'bg-gray-50'}>
				<td class="px-4 py-2 border-b">{new Date(date).toDateString()}</td>
				<td class="px-4 py-2 border-b">{name}</td>
				<td class="px-4 py-2 border-b text-right">
					<button class="text-sky-500" on:click={() => {
						entry = $trans[index]
					}}>
						Edit
					</button>
				</td>
			</tr>
		{/each}
  </tbody>
	<tfoot>
    <tr>
      <td class="px-4 py-2"></td>
      <td class="px-4 py-2"></td>
      <td class="px-4 py-2 text-right"></td>
    </tr>
  </tfoot>
</table>