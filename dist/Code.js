const sourceUrls = [
	"https://docs.google.com/spreadsheets/d/1S9bRkCnI-rVvy4ZxcVPejWBiNpw2lMJeVcOXq_t66Rs/edit#gid=0",
];
const invoiceUrls = [
	"https://docs.google.com/spreadsheets/d/1fFGmZnAJjNvyuF8gC-KuvGKmwj4OtpDu07abKh2i2As/edit#gid=0",
];

const getData = () => {
	let result = {};
	let warning = [];

	sourceUrls.forEach((url) => {
		const spreadsheet = SpreadsheetApp.openByUrl(url);

		let sheet = spreadsheet.getSheetByName("doc");
		let range = sheet.getDataRange();
		let values = range.getValues();

		values.slice(1).forEach((cells) => {
			let [ref, date, name, desc] = cells;

			date = date.toISOString().slice(0, 16);

			let resultSec = { date, name, desc };

			if (result[ref]) {
				warning.push(`duplicated doc ref '${ref}'`);
			} else {
				result[ref] = resultSec;
			}
		});

		let key = {};
		sheet = spreadsheet.getSheetByName("ledger");
		range = sheet.getDataRange();
		values = range.getValues();

		values.slice(1).forEach((cells) => {
			let [ref, docRef, account, amount] = cells;

			let resultSec = { ref, account, amount };

			if (key[ref]) {
				warning.push(`duplicated ledger ref '${ref}'`);
			} else {
				if (result[docRef].ledger) {
					result[docRef].ledger.push(resultSec);
				} else {
					result[docRef].ledger = [resultSec];
				}
			}
			key[ref] = true;
		});
	});

	invoiceUrls.forEach((url) => {
		const spreadsheet = SpreadsheetApp.openByUrl(url);
		let resultSec = {};

		let key = {};
		let sheet = spreadsheet.getSheetByName("item");
		let range = sheet.getDataRange();
		let values = range.getValues();

		values.slice(1).forEach((cells) => {
			let [ref, docRef, desc, price, qty] = cells;

			let resultThird = { ref, desc, price, qty };

			if (key[ref]) {
				warning.push(`duplicated invoice item ref '${ref}'`);
			} else {
				if (resultSec[docRef]) {
					resultSec[docRef].items.push(resultThird);
				} else {
					resultSec[docRef] = { items: [resultThird] };
				}
			}
			key[ref] = true;
		});

		sheet = spreadsheet.getSheetByName("doc");
		range = sheet.getDataRange();
		values = range.getValues();

		values.slice(1).forEach((cells) => {
			let [
				ref,
				docRef,
				lang,
				doc,
				currency,
				duedate,
				vendorName,
				vendorid,
				vendorAddress,
				clientid,
				clientAddress,
				totalAdjust,
				vatRate,
				whtRate,
				paymethod,
				subject,
				note,
			] = cells;

			duedate = duedate.toISOString().slice(0, 16);

			let resultThird = {
				ref,
				lang,
				doc,
				currency,
				duedate,
				vendorName,
				vendorid,
				vendorAddress,
				clientid,
				clientAddress,
				totalAdjust,
				vatRate,
				whtRate,
				paymethod,
				subject,
				note,
			};

			if (result[docRef].invoice) {
				warning.push(`duplicated invoice ref '${ref}'`);
			} else {
				result[docRef].invoice = { ...resultThird, ...resultSec[ref] };
			}
		});
	});

	result = Object.entries(result).map(([ref, { ...other }]) => {
		return { ref, ...other };
	});

	console.log(JSON.stringify(result[0]));

	result = { date: new Date().toJSON(), warning, data: result };

	result = JSON.stringify(result);

	console.log(result);

	return result;
};

const setData = (saves) => {
	let warning = [];

	saves = JSON.stringify(saves);

	saves.forEach((save) => {
		let { ref, date, name, desc, ledger } = save;

		sourceUrls.forEach((url) => {
			const spreadsheet = SpreadsheetApp.openByUrl(url);

			if (date) {
				let sheet = spreadsheet.getSheetByName("doc");
				let lastRow = sheet.getLastRow();
				let range = sheet.getRange(2, 1, lastRow - 1);
				let refs = range.getValues().map(([value]) => value);
				let index = refs.indexOf(ref);

				let resultSec = [ref, date, name, desc];

				if (index >= 0) {
					sheet.getRange(index + 2, 1, 1, 4).setValues([resultSec]);
				} else {
					sheet.appendRow(resultSec);
				}
			}

			if (ledger) {
				let sheet = spreadsheet.getSheetByName("ledger");
				let lastRow = sheet.getLastRow();
				let range = sheet.getRange(2, 1, lastRow - 1);
				let refs = range.getValues().map(([value]) => value);

				ledger.forEach((obj) => {
					let index = refs.indexOf(obj.ref);
					let { account, amount } = obj;

					let resultSec = [obj.ref, ref, account, amount];

					if (index >= 0) {
						sheet.getRange(index + 2, 1, 1, 4).setValues([resultSec]);
					} else {
						sheet.appendRow(resultSec);
					}
				});
			}
		});
	});

	return { date: new Date().toJSON(), warning };
};

// https://script.google.com/macros/s/AKfycbyI1zS_-2zAga9_KQ-EiRUEr9mvA0l-WFixe8sPD1HzpGl42xCC7N45gZMPhDjf-zS8ew/exec
// https://script.google.com/macros/s/AKfycbx2QVrLDxaneu3yNIme-Tdlv79YzU6aW9wRx694Q0Kd/dev

// https://script.google.com/macros/s/AKfycbyI1zS_-2zAga9_KQ-EiRUEr9mvA0l-WFixe8sPD1HzpGl42xCC7N45gZMPhDjf-zS8ew/exec?api=json
// https://script.google.com/macros/s/AKfycbx2QVrLDxaneu3yNIme-Tdlv79YzU6aW9wRx694Q0Kd/dev?api=json

const doGet = (e) => {
	if (e.parameter.api == "json") {
		let data = getData();
		let text = ContentService.createTextOutput(data);
		let json = text.setMimeType(ContentService.MimeType.JSON);
		return json;
	}

	let template = HtmlService.createTemplateFromFile("index");
	let html = template.evaluate();
	return html;
};

// const doPost = (e) => {
// 	let respond = setData(e.body.data);

// 	return respond;
// };
