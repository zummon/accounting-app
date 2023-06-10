import { loading, trans, warnings, date } from "./store";

export const getData = () => {
	loading.set(true);
	google.script.run
		.withSuccessHandler((result) => {
			result = JSON.parse(result);
			trans.set(result.data);
			date.set(result.date);
			warnings.set(result.warning);
			loading.set(false);
		})
		.withFailureHandler((error) => {})
		.getData();
};

export const setData = (data, callback) => {
	loading.set(true);
	data = JSON.stringify(data);
	google.script.run
		.withSuccessHandler((result) => {
			result = JSON.parse(result);
			date.set(result.date);
			warnings.set(result.warning);
			callback();
			loading.set(false);
		})
		.withFailureHandler((error) => {})
		.setData(data);
};
