const getData = () => {
	const user = Session.getActiveUser();

	let result = {};
	let warning = [];
	let dataset = {};
	let date = new Date().toJSON();

	databaseid[""].forEach((id) => {
		const spreadsheet = SpreadsheetApp.openById(id);
		const driveFile = DriveApp.getFileById(id);

		let fileAccess = driveFile.getAccess(user);
		let fileShare = driveFile.getSharingAccess();

		if (fileAccess !== "NONE" || fileShare.startsWith("ANYONE")) {
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
		}
	});

	databaseid.invoice.forEach((id) => {
		const spreadsheet = SpreadsheetApp.openById(id);
		const driveFile = DriveApp.getFileById(id);

		let fileAccess = driveFile.getAccess(user);
		let fileShare = driveFile.getSharingAccess();

		if (fileAccess !== "NONE" || fileShare.startsWith("ANYONE")) {
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
		}
	});

	result = Object.entries(result).map(([ref, obj]) => {
		return { ref, ...obj };
	});

	dataset.account = {};
	datasetid.account.forEach((id) => {
		const spreadsheet = SpreadsheetApp.openById(id);

		let sheet = spreadsheet.getSheets()[0];
		let values = sheet.getDataRange().getValues();

		values.slice(1).forEach((cells) => {
			let [account, note, group, groupSec, groupThird] = cells;

			dataset.account[account] = { note, group, groupSec, groupThird };
		});
	});

	result = JSON.stringify({ data: result, date, warning, dataset });

	console.log(result);

	return result;
};

const setData = (saves) => {
	const user = Session.getActiveUser();

	let warning = [];

	saves = JSON.parse(saves);

	saves.forEach((save) => {
		let { ref, date, name, desc, ledger } = save;

		databaseid[""].forEach((id) => {
			const spreadsheet = SpreadsheetApp.openById(id);
			const driveFile = DriveApp.getFileById(id);

			let fileAccess = driveFile.getAccess(user);

			if (["OWNER", "EDIT"].includes(fileAccess)) {
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
			}
		});
	});

	let date = new Date().toJSON();

	return { date, warning };
};
