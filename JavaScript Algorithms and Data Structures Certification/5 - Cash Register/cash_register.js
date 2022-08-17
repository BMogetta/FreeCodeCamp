const CURRENCY_VALUE = {
	"ONE HUNDRED": 100,
	"TWENTY": 20,
	"TEN": 10,
	"FIVE": 5,
	"ONE": 1,
	"QUARTER": 0.25,
	"DIME": 0.1,
	"NICKEL": 0.05,
	"PENNY": 0.01
};

function checkCashRegister(price, cash, cid) {
	
	let changeRequired = cash - price;

	let cashAvailable = 0;
	for(let element of cid) {
		cashAvailable += element[1]
	}
	cashAvailable = cashAvailable.toFixed(2);
	
	const changeArray = [];
	if (changeRequired > cashAvailable) { //if cash-in-drawer is less than the change due.
		return { status: "INSUFFICIENT_FUNDS", change: changeArray };
	} else if (changeRequired.toFixed(2) === cashAvailable) {
		return { status: "CLOSED", change: cid }; //if cash-in-drawer is equal to the change due.
	} else {
		for (let component of cid.reverse()) {
			let element = [component[0], 0];
			while (changeRequired >= CURRENCY_VALUE[component[0]] && component[1] > 0) {
				element[1] += CURRENCY_VALUE[component[0]];
				component[1] -= CURRENCY_VALUE[component[0]];
				changeRequired -= CURRENCY_VALUE[component[0]];
				changeRequired = changeRequired.toFixed(2);
			}
			if (element[1] > 0) {
				changeArray.push(element);
			}
		}
	}
	//if you cannot return the exact change.
	if (changeRequired > 0) return { status: "INSUFFICIENT_FUNDS", change: [] }

	return { status: "OPEN", change: changeArray};
}

