Google [Drive](https://drive.google.com/drive/folders/1J5ZgTKKmKluVhWfajBLdtCOkcxu-lKIN?usp=sharing)

- Sheets as database
- Apps Script contains
  - functions from `public` folder
  - webapp from `src` folder

[Try web app](https://script.google.com/macros/s/AKfycbx2QVrLDxaneu3yNIme-Tdlv79YzU6aW9wRx694Q0Kd/dev)

[Get JSON](https://script.google.com/macros/s/AKfycbx2QVrLDxaneu3yNIme-Tdlv79YzU6aW9wRx694Q0Kd/dev?api=json)

<!--


	export const filterTrans = derived([trans, query], ([$trans, $query]) => {
		let result = [];

		$trans.forEach((item) => {
			if ($query.names.includes(item.name) || $query.names.length == 0) {
				let resultSec = { ...item, ledger: [] };

				if (item.date <= $query.date.end || $query.date.end == "") {
					item.ledger.forEach((itemSec) => {
						const group = Number(itemSec.account.charAt(0));

						if (item.date < $query.date.start) {
							if (group >= 4) {
								itemSec.account = "3 Generated retained earnings";
							}
						}

						resultSec.ledger.push(itemSec);
					});
				}

				result.push(resultSec);
			}
		});

		$query.accounts;
		$query.refs;

		return result;
	});

	export const subtotal = derived(filterTrans, ($filterTrans) => {
		let result = {};

		$filterTrans.forEach((item) => {
			item.ledger.forEach((itemSec) => {
				if (result[itemSec.account]) {
					result[itemSec.account] += itemSec.amount;
				} else {
					result[itemSec.account] = itemSec.amount;
				}
			});
		});

		return result;
	});

 -->
