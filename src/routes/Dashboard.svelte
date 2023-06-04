<script>
	import { subtotal } from "../lib/store";
	import { accountGroup } from "../lib/dataset";
	import { onMount } from "svelte";
	import chartjs from "chart.js/auto";

	let ctx;
	let chartCanvas;

	let grouptotal = {};

	$: {
		grouptotal = {};
		Object.entries($subtotal).forEach(([key, value]) => {
			let group = Number(key.charAt(0));
			let groupName = accountGroup[group];

			if (group >= 2 && group <= 4) {
				value = -value;
			}

			if (grouptotal[groupName]) {
				grouptotal[groupName] += value;
			} else {
				grouptotal[groupName] = value;
			}
		});

		// accountType <= 1;
		// accountType >= 2;
		// accountType >= 5;

		console.log(grouptotal);

		// if (ctx) {
		updateChart();
		// }
	}

	const updateChart = () => {
		// if (chartCanvas) chartCanvas.destroy();
		// ctx = document.getElementById("chart");
		// new chartjs(ctx, {
		// 	type: "doughnut",
		// 	data: {
		// 		labels: Object.keys(grouptotal),
		// 		datasets: [
		// 			{
		// 				data: Object.values(grouptotal),
		// 				backgroundColor: [
		// 					"rgb(255, 105, 96)",
		// 					"rgb(255, 142, 0)",
		// 					"rgb(255, 187, 51)",
		// 					"rgb(255, 223, 102)",
		// 					"rgb(255, 255, 153)",
		// 				],
		// 			},
		// 		],
		// 	},
		// });
	};

	onMount(async () => {
		// updateChart();
	});
</script>

<!-- <div class="flex flex-wrap px-2 pb-4">
	<div class="aspect-video w-full lg:w-1/2">
		<canvas id="chart" />
	</div>
	<div class="w-full lg:w-1/2" />
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
		<tfoot class="">
			<tr>
				<td class="px-2 py-2">Balance</td>
				<td class="px-2 py-2 text-right">0</td>
			</tr>
		</tfoot>
	</table>
</div>
