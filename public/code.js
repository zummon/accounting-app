const getData = ({ source }) => {
	const user = Session.getActiveUser();

	let data = {};
	let warnings = [];
	let date = new Date().toJSON();
	let dataset = { accounts: {}, names: {} };

	source[""].forEach((id) => {
		const spreadsheet = SpreadsheetApp.openById(id);
		const driveFile = DriveApp.getFileById(id);

		let fileAccess = driveFile.getAccess(user);
		let fileShare = driveFile.getSharingAccess();

		if (fileAccess !== "NONE" || fileShare.startsWith("ANYONE")) {
			let uniqueKey = {};
			let sheet = spreadsheet.getSheetByName("doc");
			let range = sheet.getDataRange();
			let values = range.getValues();

			values.slice(1).forEach((cells) => {
				let [key, date, name, desc, belongTo] = cells;

				date = date.toISOString().slice(0, 16);
				key = key.toString();

				let result = { date, name, desc, belongTo };

				if (data[key]) {
					warnings.push(`duplicated key "${key}"`);
				} else {
					data[key] = result;
				}
			});

			sheet = spreadsheet.getSheetByName("ledger");
			range = sheet.getDataRange();
			values = range.getValues();

			values.slice(1).forEach((cells) => {
				let [key, docKey, account, amount] = cells;

				key = key.toString();
				docKey = docKey.toString();

				let result = { key, account, amount };

				if (uniqueKey[key]) {
					warnings.push(`duplicated ledger key "${key}"`);
				} else {
					if (data[docKey]) {
						if (data[docKey].ledger) {
							data[docKey].ledger.push(result);
						} else {
							data[docKey].ledger = [result];
						}
					} else {
						warnings.push(`ledger has unexpected key "${key}"`);
					}
				}
				uniqueKey[key] = true;
			});
		}
	});

	source["invoice"].forEach((id) => {
		const spreadsheet = SpreadsheetApp.openById(id);
		const driveFile = DriveApp.getFileById(id);

		let fileAccess = driveFile.getAccess(user);
		let fileShare = driveFile.getSharingAccess();

		if (fileAccess !== "NONE" || fileShare.startsWith("ANYONE")) {
			let uniqueKey = {};
			let item = {};
			let sheet = spreadsheet.getSheetByName("item");
			let range = sheet.getDataRange();
			let values = range.getValues();

			values.slice(1).forEach((cells) => {
				let [key, docKey, desc, price, qty] = cells;

				key = key.toString();
				docKey = docKey.toString();

				let result = { key, desc, price, qty };

				if (uniqueKey[key]) {
					warnings.push(`duplicated invoice item key "${key}"`);
				} else {
					if (item[docKey]) {
						item[docKey].push(result);
					} else {
						item[docKey] = [result];
					}
				}
				uniqueKey[key] = true;
			});

			uniqueKey = {};
			sheet = spreadsheet.getSheetByName("doc");
			range = sheet.getDataRange();
			values = range.getValues();

			values.slice(1).forEach((cells) => {
				let [
					key,
					srcKey,
					lang,
					doc,
					currency,
					duedate,
					totalAdjust,
					vatRate,
					whtRate,
					paymethod,
					subject,
					note,
				] = cells;

				duedate = duedate.toISOString().slice(0, 16);
				key = key.toString();
				srcKey = srcKey.toString();

				let result = {
					key,
					lang,
					doc,
					currency,
					duedate,
					totalAdjust,
					vatRate,
					whtRate,
					paymethod,
					subject,
					note,
					item: item[key].slice(),
				};

				delete item[key];

				if (uniqueKey[key]) {
					warnings.push(`duplicated invoice key "${key}"`);
				} else {
					if (data[srcKey]) {
						if (data[srcKey].invoice) {
							data[srcKey].invoice.push(result);
						} else {
							data[srcKey].invoice = [result];
						}
					} else {
						warnings.push(`invoice has unexpected key "${key}"`);
					}
				}
				uniqueKey[key] = true;
			});

			// if (item) {
			// 	warnings.push(`invoice item has unexpected key "${key}"`);
			// }
		}
	});

	source["accounts"].forEach((id) => {
		const spreadsheet = SpreadsheetApp.openById(id);

		let sheet = spreadsheet.getSheetByName("coa");
		let values = sheet.getDataRange().getValues();

		values.slice(1).forEach((cells) => {
			let [
				account,
				note,
				group,
				groupSec,
				groupThird,
				absolute,
				dateExpire,
				code,
			] = cells;

			if (dateExpire) {
				dateExpire = dateExpire.toISOString().slice(0, 16);
			}
			account = account.toString();

			let resultSec = {
				note,
				group,
				groupSec,
				groupThird,
				absolute,
				dateExpire,
				code,
			};

			dataset.accounts[account] = resultSec;
		});
	});

	source["names"].forEach((id) => {
		const spreadsheet = SpreadsheetApp.openById(id);

		let sheet = spreadsheet.getSheetByName("register");
		let values = sheet.getDataRange().getValues();

		values.slice(1).forEach((cells) => {
			let [name, id, address, note, dateExpire] = cells;

			if (dateExpire) {
				dateExpire = dateExpire.toISOString().slice(0, 16);
			}
			name = name.toString();

			let resultSec = { id, address, note, dateExpire };

			dataset.names[name] = resultSec;
		});
	});

	data = Object.entries(data).map(([key, obj]) => {
		return { key, ...obj };
	});

	let json = JSON.stringify({ data, date, warnings, dataset });

	return json;
};

const setData = ({ source, data }) => {
	const user = Session.getActiveUser();

	let warnings = [];

	data = JSON.parse(data);

	data.forEach((item) => {
		let { key, date, name, desc, belongTo, ledger, invoice } = item;

		source[""].forEach((id) => {
			const spreadsheet = SpreadsheetApp.openById(id);
			const driveFile = DriveApp.getFileById(id);

			let fileAccess = driveFile.getAccess(user);

			// if (["OWNER", "EDIT", "COMMENT"].includes(fileAccess)) {
			if (key) {
				let sheet = spreadsheet.getSheetByName("doc");
				let lastRow = sheet.getLastRow();
				let range = sheet.getRange(2, 1, lastRow - 1);
				let keys = range.getValues().map(([value]) => value.toString());
				let index = keys.indexOf(key);

				let resultSec = [key, date, name, desc, belongTo];

				if (index >= 0) {
					sheet
						.getRange(index + 2, 1, 1, resultSec.length)
						.setValues([resultSec]);
				} else {
					sheet.appendRow(resultSec);
				}
			}

			if (ledger) {
				let sheet = spreadsheet.getSheetByName("ledger");
				let lastRow = sheet.getLastRow();
				let range = sheet.getRange(2, 1, lastRow - 1);
				let keys = range.getValues().map(([value]) => value.toString());

				ledger.forEach((obj) => {
					let index = keys.indexOf(obj.key);
					let { account, amount } = obj;

					let resultSec = [obj.key, key, account, amount];

					if (index >= 0) {
						sheet
							.getRange(index + 2, 1, 1, resultSec.length)
							.setValues([resultSec]);
					} else {
						sheet.appendRow(resultSec);
					}
				});
			}
			// }
		});

		if (invoice) {
			invoice.forEach((obj) => {
				let {
					lang,
					doc,
					currency,
					duedate,
					totalAdjust,
					vatRate,
					whtRate,
					paymethod,
					subject,
					note,
					item,
				} = obj;

				source["invoice"].forEach((id) => {
					const spreadsheet = SpreadsheetApp.openById(id);
					const driveFile = DriveApp.getFileById(id);

					let fileAccess = driveFile.getAccess(user);

					if (["OWNER", "EDIT", "COMMENT"].includes(fileAccess)) {
						if (obj.key) {
							let sheet = spreadsheet.getSheetByName("doc");
							let lastRow = sheet.getLastRow();
							let range = sheet.getRange(2, 1, lastRow - 1);
							let keys = range.getValues().map(([value]) => value.toString());
							let index = keys.indexOf(obj.key);

							let resultSec = [
								obj.key,
								key,
								lang,
								doc,
								currency,
								duedate,
								totalAdjust,
								vatRate,
								whtRate,
								paymethod,
								subject,
								note,
							];

							if (index >= 0) {
								sheet
									.getRange(index + 2, 1, 1, resultSec.length)
									.setValues([resultSec]);
							} else {
								sheet.appendRow(resultSec);
							}
						}

						if (item) {
							let sheet = spreadsheet.getSheetByName("item");
							let lastRow = sheet.getLastRow();
							let range = sheet.getRange(2, 1, lastRow - 1);
							let keys = range.getValues().map(([value]) => value.toString());

							ledger.forEach((objSec) => {
								let index = keys.indexOf(objSec.key);
								let { desc, price, qty } = objSec;

								let resultSec = [objSec.key, obj.key, desc, price, qty];

								if (index >= 0) {
									sheet
										.getRange(index + 2, 1, 1, resultSec.length)
										.setValues([resultSec]);
								} else {
									sheet.appendRow(resultSec);
								}
							});
						}
					}
				});
			});
		}
	});

	let date = new Date().toJSON();
	let json = JSON.stringify({ date, warnings });

	return json;
};

const doGet = (e) => {
	if (e.parameter.get == "data") {
		let data = getData({ source });
		let text = ContentService.createTextOutput(data);
		let json = text.setMimeType(ContentService.MimeType.JSON);
		return json;
	}

	let template = HtmlService.createTemplateFromFile("index");
	let html = template.evaluate();
	return html;
};

const source = {
	"": ["1S9bRkCnI-rVvy4ZxcVPejWBiNpw2lMJeVcOXq_t66Rs"],
	invoice: ["1fFGmZnAJjNvyuF8gC-KuvGKmwj4OtpDu07abKh2i2As"],
	accounts: ["1UydCQCoylxCiooiGLYlH_EbFkoKq9eiL8iinB03c37k"],
	names: ["108gT2so0W2R6uEXpsMigngr_4yzFq6NKddQKCziGcCg"],
};
