/* multiply by 100
 * purpose: to avoid floating point arithmetic
 * floating point arithmetic causes issues
 */
const currency = {
  "PENNY": 0.01 * 100,
	"NICKEL": 0.05 * 100,
	"DIME": 0.10 * 100,
	"QUARTER": 0.25 * 100,
	"ONE": 1 * 100,
	"FIVE": 5 * 100,
	"TEN": 10 * 100,
	"TWENTY": 20 * 100,
	"ONE HUNDRED": 100 * 100
}

function objValMultHundred(obj) {
	let newObj = Object.assign(obj);
	for (const val in newObj) {
		newObj[val] = Math.trunc(newObj[val] *100);
	}
	return newObj;
}

function getLargeBillFirst(money, drawer, changeBack) {
	if (money - currency['ONE HUNDRED'] >= 0 && drawer['ONE HUNDRED'] - 100 * 100 >= 0) {
		changeBack['ONE HUNDRED'] += 100;
		drawer['ONE HUNDRED'] -= 100 * 100 ;
		return getLargeBillFirst(money - currency['ONE HUNDRED'], drawer, changeBack);
	}
	if (money - currency.TWENTY >= 0 && drawer.TWENTY - 20  * 100 >= 0) {
		changeBack.TWENTY += 20;
		drawer.TWENTY -= 20 * 100 ;
		return getLargeBillFirst(money - currency.TWENTY, drawer, changeBack);
	}
	if (money - currency.TEN >= 0 && drawer.TEN - 10  * 100 >= 0) {
		changeBack.TEN += 10;
		drawer.TEN -= 10 * 100 ;
		return getLargeBillFirst(money - currency.TEN, drawer, changeBack);
	}
	if (money - currency.FIVE >= 0 && drawer.FIVE - 5 * 100 >= 0) {
		changeBack.FIVE += 5;
		drawer.FIVE -= 5 * 100 ;
		return getLargeBillFirst(money - currency.FIVE, drawer, changeBack);
	}
	if (money - currency.ONE >= 0 && drawer.ONE - 1 * 100 >= 0) {
		changeBack.ONE += 1;
		drawer.ONE -= 1 * 100 ;
		return getLargeBillFirst(money - currency.ONE, drawer, changeBack);
	}
	if (money - currency.QUARTER >= 0 && drawer.QUARTER - 0.25 * 100 >= 0) {
		changeBack.QUARTER += 0.25;
		drawer.QUARTER -= 0.25 * 100;
		return getLargeBillFirst(money - currency.QUARTER, drawer, changeBack);
	}
	if (money - currency.DIME >= 0 && drawer.DIME - 0.10 * 100 >= 0) {
		changeBack.DIME += 0.10;
		drawer.DIME -= 0.10 * 100;
		return getLargeBillFirst(money - currency.DIME, drawer, changeBack);
	}
	if (money - currency.NICKEL >= 0 && drawer.NICKEL - 0.05 * 100 >= 0) {
		changeBack.NICKEL += 0.05;
		drawer.NICKEL -= 0.05 * 100 ;
		return getLargeBillFirst(money - currency.NICKEL, drawer, changeBack);
	}
	if (money - currency.PENNY >= 0 && drawer.PENNY - 0.01 * 100 >= 0) {
		changeBack.PENNY += 0.01;
		drawer.PENNY -= 0.01 * 100 ;
		return getLargeBillFirst(money - currency.PENNY, drawer, changeBack);
	}
	
	return money / 100;
}

/* parameter: price, payment, cash in drawer
 * cash in drawer is 2D array
 * if you cannot return the exact change due
 *   return {status: "INSUFFICIENT_FUNDS", change: []}
 * if cash in drawer is equal to the change due
 * with cash in drawer as the value for the key change
 *   return {status: "CLOSED", change: [...]} 
 * Otherwise, with coins and bills sorted from highest to lowest order 
 * as the value of the change key 
 *   return {status: "OPEN", change: [...]}
 */
function checkCashRegister(price, cash, cid) {
	let changeBack = {
		"PENNY": 0,
		"NICKEL": 0,
		"DIME": 0,
		"QUARTER": 0,
		"ONE": 0,
		"FIVE": 0,
		"TEN": 0,
		"TWENTY": 0,
		"ONE HUNDRED": 0
	}
  let change = cash - price;
	let moneyObj = {};
	let money = 0;
	let moneyArr = [];

	for (const val in cid) {
		moneyObj[cid[val][0]] = cid[val][1];
		money += cid[val][1];
	}

	if (money === change) return {status:"CLOSED", change: cid};
	if (money < change) return {status: "INSUFFICIENT_FUNDS", change: []};

	if (money > change) {
		moneyObj = objValMultHundred(moneyObj);
		const moneyOwe = getLargeBillFirst(change * 100, moneyObj, changeBack);
		
		for (const val in changeBack) {
			if (changeBack[val] !== 0) {
				let arr = [];
				arr.push(val, changeBack[val]);
				moneyArr.push(arr);
			}
		}
		if (moneyOwe > 0) {
			return {status: "INSUFFICIENT_FUNDS", change: []};
		} else {
			return {status:"OPEN", change: moneyArr.reverse()};			
		}
	}
	return false;
}

console.log(checkCashRegister(19.5, 20, [
	["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], 
	["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]
]));
console.log(checkCashRegister(3.26, 100, [
	["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], 
	["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]
]));
console.log(checkCashRegister(19.5, 20, [
	["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], 
	["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]
]));
console.log(checkCashRegister(19.5, 20, [
	["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], 
	["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]
])); 
console.log(checkCashRegister(19.5, 20, [
	["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], 
	["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]
])); 

