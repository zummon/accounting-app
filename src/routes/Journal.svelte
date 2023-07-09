<script>
	import { v4 as uuidv4 } from "uuid";

	export let data = [];
</script>

<div class="mb-4 flex flex-wrap items-center justify-center gap-2">
	<label class="">
		<span class="">Belong to</span>
		<input
			class="rounded-full border-0 bg-transparent px-3 py-2 shadow-sm ring-1 ring-gray-500 focus:ring-2 focus:ring-green-500"
			type="text"
			list="names"
			bind:value={tran.belongTo} />
	</label>
</div>
<div class="mb-4 flex flex-wrap items-center justify-center gap-2">
	<label class="">
		<span class="">KEY</span>
		<input
			class="rounded-full border-0 bg-transparent px-3 py-2 shadow-sm ring-1 ring-gray-500 focus:ring-2 focus:ring-green-500 disabled:text-gray-500"
			type="text"
			list="keys"
			disabled
			bind:value={tran.key} />
	</label>
	<label class="">
		<span class="">Date</span>
		<input
			class="rounded-full border-0 bg-transparent px-3 py-2 shadow-sm ring-1 ring-gray-500 focus:ring-2 focus:ring-green-500"
			type="datetime-local"
			bind:value={tran.date} />
	</label>
	<label class="">
		<span class="">Name</span>
		<input
			class="rounded-full border-0 bg-transparent px-3 py-2 shadow-sm ring-1 ring-gray-500 focus:ring-2 focus:ring-green-500"
			type="text"
			list="names"
			bind:value={tran.name} />
	</label>
	<label class="">
		<span class="">Description</span>
		<textarea
			class="grow rounded-full border-0 bg-transparent px-3 py-2 shadow-sm ring-1 ring-gray-500 focus:ring-2 focus:ring-green-500"
			rows="1"
			bind:value={tran.desc} />
	</label>
</div>
<div class="mb-4">
	<div class="mb-2 flex items-center justify-center gap-2 font-semibold">
		<button
			class="inline-flex gap-2 rounded-full bg-green-500 px-4 py-2 font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-1 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500 dark:shadow-green-800"
			type="button"
			on:click={() => {
				if (tran.ledger) {
					tran.ledger = [{ key: uuidv4() }, { key: uuidv4() }, ...tran.ledger];
				} else {
					tran.ledger = [{ key: uuidv4() }, { key: uuidv4() }];
				}
			}}>
			<span class="">Ledger</span>
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
</div>
<div class="">
	<div class="mb-2 flex gap-2">
		<div class="grow font-semibold">Transactions</div>
		<button class="" type="button" on:click={() => {}}>
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
					class="flex max-w-lg items-center gap-2 text-green-500"
					type="button"
					on:click={() => {
						tran = item;
					}}>
					<span class="truncate">
						{new Date(item.date).toLocaleDateString(undefined, {
							day: "2-digit",
							month: "short",
							year: "numeric",
						})}
					</span>
					<span class="truncate">
						{item.name}
					</span>
					<span class="grow truncate">
						{item.desc}
					</span>
				</button>
			</div>
		{/each}
	</div>
</div>

<table class="my-4 w-full rounded-lg border">
	<thead class="">
		<tr class="">
			<td class="border-b border-black px-4 py-2 font-semibold">Date</td>
			<td class="border-b border-black px-4 py-2 font-semibold" colspan="2">
				Account
			</td>
			<td class="border-b border-black px-4 py-2 text-right font-semibold">
				Debit
			</td>
			<td class="border-b border-black px-4 py-2 text-right font-semibold">
				Credit
			</td>
		</tr>
	</thead>
	<tbody class="">
		{#each data as item, index (`tran-${index}`)}
			{#each item.ledger as itemSec, indexSec (`ledger-${index}-${indexSec}`)}
				<tr class="">
					<td class="border-b px-4 py-2">
						{#if indexSec == 0}
							{new Date(item.date).toLocaleDateString(undefined, {
								year: "numeric",
								month: "short",
								day: "2-digit",
							})}
						{:else if indexSec == 1}
							{item.name}
						{/if}
					</td>
					<td class="border-b px-4 py-2" colspan={itemSec.amount > 0 ? 2 : 1}>
						{#if itemSec.amount > 0}
							{itemSec.account}
						{/if}
					</td>
					{#if itemSec.amount < 0}
						<td class="border-b px-4 py-2">
							{itemSec.account}
						</td>
					{/if}
					<td class="border-b px-4 py-2 text-right">
						{#if itemSec.amount > 0}
							{itemSec.amount}
						{/if}
					</td>
					<td class="border-b px-4 py-2 text-right">
						{#if itemSec.amount < 0}
							{-itemSec.amount}
						{/if}
					</td>
				</tr>
			{/each}
			<tr class="">
				<td class="border-b border-black px-4 py-2" />
				<td class="border-b border-black px-4 py-2" colspan="2">
					{item.desc}
				</td>
				<td class="border-b border-black px-4 py-2 text-right" />
				<td class="border-b border-black px-4 py-2 text-right" />
			</tr>
		{/each}
	</tbody>
	<tfoot class="">
		<tr class="">
			<td class="px-4 py-2" />
			<td class="px-4 py-2" colspan="2" />
			<td class="px-4 py-2 text-right" />
			<td class="px-4 py-2 text-right" />
		</tr>
	</tfoot>
</table>
