<script>
	import { subtotal } from "../lib/store";
	import { onMount } from "svelte";
	// import chartjs from 'chart.js/auto';

	// let ctx;
	// let chartCanvas;

	let grouptotal = {};

	$: {
		grouptotal = {};
		Object.entries($subtotal).forEach(([key, value]) => {
			let group = Number(key.charAt(0));
			let groupName = ["Asset", "Liability", `Owner's equity`, "Revenue"][
				group - 1
			];

			if (group >= 2 && group <= 4) {
				value = -value;
			}
			if (group >= 5) {
				groupName = "Expense";
			}

			if (grouptotal[groupName]) {
				grouptotal[groupName] += value;
			} else {
				grouptotal[groupName] = value;
			}
		});

		// accountType <= 1
		// accountType >= 2
		// accountType >= 5
	}

	// const updateChart = () => {
	// 	if (chartCanvas) chartCanvas.destroy()
	// 	ctx = document.getElementById('chart');
	// 	new chartjs(ctx, {
	// 		type: 'doughnut',
	// 		data: {
	// 			labels: Object.keys($subtotal),
	// 			datasets: [{
	// 				data: Object.values($subtotal),
	// 				backgroundColor: [
	// 					"rgb(255, 105, 96)",
	// 					"rgb(255, 142, 0)",
	// 					"rgb(255, 187, 51)",
	// 					"rgb(255, 223, 102)",
	// 					"rgb(255, 255, 153)"
	// 				],
	// 			}]
	// 		}
	// 	});
	// }

	onMount(async () => {});
</script>

<!-- <div class="px-2 pb-4">
	<canvas id="chart"></canvas>
</div> -->

<div class="px-2 pb-4">
	<table class="">
		<thead class="border-b">
			<tr>
				<td class="px-2 py-2">Group</td>
				<td class="px-2 py-2 text-right">Amount</td>
			</tr>
		</thead>
		<tbody>
			{#each Object.entries(grouptotal) as [key, value], index (`group-${index}`)}
				<tr class="border-b">
					<td class="px-2 py-2">{key}</td>
					<td class="px-2 py-2 text-right">{value}</td>
				</tr>
			{/each}
		</tbody>
		<!-- <tfoot class="">
      <tr>
        <td class="px-2 py-2">Balance</td>
        <td class="px-2 py-2 text-right">0</td>
      </tr>
    </tfoot> -->
	</table>
</div>
