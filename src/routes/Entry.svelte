<script>
	import { trans, loading, setData } from "../lib/store";
	import { onMount } from "svelte";
	import { v4 as uuidv4 } from "uuid";

	onMount(async () => {});
</script>

<div class="container mx-auto flex flex-wrap gap-4">
	{#each $trans as item, index (`tran-${index}`)}
		<div class="flex flex-col gap-2 rounded-lg px-4 py-3 shadow-md">
			<div class="">
				<input
					class="rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
					type="datetime-local"
					bind:value={item.date} />
			</div>
			<div class="">
				<abbr class="no-underline" title="Name">
					<input
						class="rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
						list="names"
						bind:value={item.name} />
				</abbr>
			</div>
			<div class="w-full">
				<textarea
					class="w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
					rows="2"
					bind:value={item.desc} />
			</div>
			<div class="">
				<div class="">
					{#each item.ledger as itemSec, index (`ledger-${index}`)}
						<div class="flex">
							<label class="">
								<input
									class="rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
									type="text"
									list="accounts"
									placeholder="Account..."
									bind:value={itemSec.account} />
							</label>
							<label class="">
								<input
									class="rounded-md border-0 px-3 py-2 text-right text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-500"
									type="number"
									placeholder="Amount"
									bind:value={itemSec.amount} />
							</label>
							<button
								class="text-fuchsia-500"
								on:click={() => {
									// item.ledger.splice(index, 1);
									// item.ledger = item.ledger;
									itemSec.account = null;
									itemSec.amount = null;
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
					<div class="mt-4 flex flex-wrap gap-4">
						<button
							class="rounded-full bg-green-500 px-4 py-2 text-lg font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-2 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500"
							on:click={() => {
								item.ledger = [
									{ ref: uuidv4() },
									{ ref: uuidv4() },
									...item.ledger,
								];
							}}>
							Add
						</button>

						<button
							class="rounded-full bg-green-500 px-4 py-2 text-lg font-semibold text-white shadow-md shadow-green-200 transition duration-300 hover:bg-white hover:text-green-500 hover:shadow-none hover:ring-2 hover:ring-green-500 focus:bg-white focus:text-green-500 focus:shadow-none focus:ring-2 focus:ring-green-500 disabled:bg-white disabled:text-green-500 disabled:shadow-none"
							disabled={$loading}
							on:click={async () => {
								let warning;
								item.ledger.forEach((itemSec) => {
									if (itemSec.account) {
										if (isNaN(itemSec.account.charAt(0))) {
											warning = true;
											console.log("Account must start with number 0-9");
										}
									}
								});
								if (warning) {
								} else {
									await setData([item]);
								}
							}}>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
