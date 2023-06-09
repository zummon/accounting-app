const getData = () => {
	const user = Session.getActiveUser();

	let result = {};
	let warning = [];
	let dataset = {};
	let date = new Date().toJSON();

	dataset.account = {};
	source.accounts.forEach((id) => {
		const spreadsheet = SpreadsheetApp.openById(id);

		let sheet = spreadsheet.getSheets()[0];
		let values = sheet.getDataRange().getValues();

		values.slice(1).forEach((cells) => {
			let [account, note, group, groupSec, groupThird, absolute] = cells;

			dataset.account[account] = {
				note,
				group,
				groupSec,
				groupThird,
				absolute,
			};
		});
	});

	source[""].forEach((id) => {
		const spreadsheet = SpreadsheetApp.openById(id);
		const driveFile = DriveApp.getFileById(id);

		let fileAccess = driveFile.getAccess(user);
		let fileShare = driveFile.getSharingAccess();

		if (fileAccess !== "NONE" || fileShare.startsWith("ANYONE")) {
			let sheet = spreadsheet.getSheetByName("doc");
			let range = sheet.getDataRange();
			let values = range.getValues();

			values.slice(1).forEach((cells) => {
				let [key, date, name, desc] = cells;

				date = date.toISOString().slice(0, 16);

				let resultSec = { date, name, desc };

				if (result[key]) {
					warning.push(`duplicated key '${key}'`);
				} else {
					result[key] = resultSec;
				}
			});

			let uniqueKey = {};
			sheet = spreadsheet.getSheetByName("ledger");
			range = sheet.getDataRange();
			values = range.getValues();

			values.slice(1).forEach((cells) => {
				let [key, docKey, account, amount] = cells;

				let resultSec = { key, account, amount, ...dataset.account[account] };

				if (uniqueKey[key]) {
					warning.push(`duplicated ledger key '${key}'`);
				} else {
					if (result[docKey].ledger) {
						result[docKey].ledger.push(resultSec);
					} else {
						result[docKey].ledger = [resultSec];
					}
				}
				uniqueKey[key] = true;
			});
		}
	});

	source.invoice.forEach((id) => {
		const spreadsheet = SpreadsheetApp.openById(id);
		const driveFile = DriveApp.getFileById(id);

		let fileAccess = driveFile.getAccess(user);
		let fileShare = driveFile.getSharingAccess();

		if (fileAccess !== "NONE" || fileShare.startsWith("ANYONE")) {
			let resultSec = {};

			let uniqueKey = {};
			let sheet = spreadsheet.getSheetByName("item");
			let range = sheet.getDataRange();
			let values = range.getValues();

			values.slice(1).forEach((cells) => {
				let [key, docKey, desc, price, qty] = cells;

				let resultThird = { key, desc, price, qty };

				if (uniqueKey[key]) {
					warning.push(`duplicated invoice item key '${key}'`);
				} else {
					if (resultSec[docKey]) {
						resultSec[docKey].items.push(resultThird);
					} else {
						resultSec[docKey] = { items: [resultThird] };
					}
				}
				uniqueKey[key] = true;
			});

			sheet = spreadsheet.getSheetByName("doc");
			range = sheet.getDataRange();
			values = range.getValues();

			values.slice(1).forEach((cells) => {
				let [
					key,
					docKey,
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
					key,
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

				if (result[docKey].invoice) {
					warning.push(`duplicated invoice key '${key}'`);
				} else {
					result[docKey].invoice = { ...resultThird, ...resultSec[key] };
				}
			});
		}
	});

	result = Object.entries(result).map(([key, obj]) => {
		return { key, ...obj };
	});

	result = JSON.stringify({ data: result, date, warning });

	console.log(result);

	return result;
};

const setData = (saves) => {
	const user = Session.getActiveUser();

	let warning = [];

	saves = JSON.parse(saves);

	saves.forEach((save) => {
		let { key, date, name, desc, ledger } = save;

		source[""].forEach((id) => {
			const spreadsheet = SpreadsheetApp.openById(id);
			const driveFile = DriveApp.getFileById(id);

			let fileAccess = driveFile.getAccess(user);

			if (["OWNER", "EDIT"].includes(fileAccess)) {
				if (date) {
					let sheet = spreadsheet.getSheetByName("doc");
					let lastRow = sheet.getLastRow();
					let range = sheet.getRange(2, 1, lastRow - 1);
					let keys = range.getValues().map(([value]) => value);
					let index = keys.indexOf(key);

					let resultSec = [key, date, name, desc];

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
					let keys = range.getValues().map(([value]) => value);

					ledger.forEach((obj) => {
						let index = keys.indexOf(obj.key);
						let { account, amount } = obj;

						let resultSec = [obj.key, key, account, amount];

						if (index >= 0) {
							sheet.getRange(index + 2, 1, 1, 4).setValues([resultSec]);
						} else {
							sheet.appendRow(resultSec);
						}
					});
				}
			}
		});
	});

	let date = new Date().toJSON();

	return { date, warning };
};
