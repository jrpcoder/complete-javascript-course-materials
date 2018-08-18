/* **********************************************++
 1 coding challenge
 */

const markWeight = 75; // kg
const johnWeight = 68; // kg
const markHeight = 1.76; // meter
const johnHeight = 1.81; // meter
let markIbm; let johnIbm; let isMarkIbmHigher; let 
output;

const ibmMethods = {
  calcIBM(weight, height) {
    return weight / (height * height);
  },
  compareIbm(ibm1, ibm2) {
    return ibm1 > ibm2;
  },
};

markIbm = ibmMethods.calcIBM(markWeight, markHeight);
johnIbm = ibmMethods.calcIBM(johnWeight, johnHeight);
isMarkIbmHigher = ibmMethods.compareIbm(markIbm, johnIbm);
output = `Is Mark's IBM higher than John's? ${isMarkIbmHigher}`;
console.log(markIbm, johnIbm);
console.log(output);


/* ****************************************+
2 Coding Challenge
 */

const johnLast3Results = [89, 120, 103];
const mikeLast3Results = [5, 94, 123];
const maryLast3Results = [97, 134, 105];
let avgJohnPerWin; let avgMikePerWin; let avgMaryPerWin; let 
winnerAnnouncement;

const methods = {
  calcAvg(name, resultsArray) {
    const totalSumArray = resultsArray.reduce((accumulator, currentValue) => accumulator + currentValue);
    // console.log(totalSumArray);
    return [name, totalSumArray / (resultsArray.length)];
  },
  checkBiggestWinner(avg1, avg2, avg3) {
    switch (true) {
      case avg1[1] > avg2[1] && avg1[1] > avg3[1]:
        console.log(`${avg1[0]} has the best average win with ${avg1[1]}`);
        break;
      case avg2[1] > avg1[1] && avg2[1] > avg3[1]:
        console.log(`${avg2[0]} has the best average win with ${avg2[1]}`);
        break;
      case avg3[1] > avg1[1] && avg3[1] > avg2[1]:
        console.log(`${avg3[0]} has the best average win with ${avg3[1]}`);
        break;
      default:
        console.log('There\'s at least two players with the same average');
    }
  },
};

avgJohnPerWin = methods.calcAvg('John', johnLast3Results);
avgMikePerWin = methods.calcAvg('Mike', mikeLast3Results);
avgMaryPerWin = methods.calcAvg('Mary', maryLast3Results);
methods.checkBiggestWinner(avgJohnPerWin, avgMikePerWin, avgMaryPerWin);

/* *****************************************************
 3 coding challenge
 */

const johnBills = [134, 48, 268];
const tipsArr = [];
const totalPayArr = [];

const tipMethods = {
  calcTip(billsArr) {
    billsArr.forEach((amount) => {
      switch (true) {
        case amount < 50:
          const tip20Percent = 0.2;
          this.giveTipResult(amount, tip20Percent, tipsArr, totalPayArr);
          break;
        case amount >= 50 <= 200:
          const tip15Percent = 0.15;
          this.giveTipResult(amount, tip15Percent, tipsArr, totalPayArr);
          break;
        default:
          const tip10Percent = 0.1;
          this.giveTipResult(amount, tip10Percent, tipsArr, totalPayArr);
      }
    });
    console.log(tipsArr, totalPayArr);
  },
  giveTipResult(amount, tipPercentage, tipsArr, totalPayArr) {
    tipsArr.push(amount * tipPercentage);
    totalPayArr.push(amount + amount * tipPercentage);
  },
};

tipMethods.calcTip(johnBills);

/* ****************************************************************
 4 coding challenge
*/

let markData = {
  name: 'Mark',
  weight: 89,
  height: 1.78,
};

let johnData = {
  name: 'John',
  weight: 80,
  height: 1.88,
};

const ibmMethods2 = {
  ibmCalc(weight, height) {
    let ibm = weight / (height * height);
    console.log(ibm, weight, height, this);
    return ibm;
  },
  compareIbm(dataObj1, dataObj2) {
    let result;
    switch (true) {
      case dataObj1.IBM < dataObj2.IBM:
        result = `${dataObj2.name} has a higher IBM than ${dataObj1.name} with ${dataObj2.IBM}.`;
        console.log(result);
        break;
      case dataObj1.IBM > dataObj2.IBM:
        result = `${dataObj1.name} has a higher IBM than ${dataObj2.name} with ${dataObj1.IBM}.`;
        console.log(result);
        break;
      default:
        result = `Both have the same IBM with ${dataObj1.IBM}.`;
        console.log(result);
    }
  }
}

markData.IBM = ibmMethods2.ibmCalc(markData.weight, markData.height);
johnData.IBM = ibmMethods2.ibmCalc(johnData.weight, johnData.height);
console.log(markData, johnData);
ibmMethods2.compareIbm(markData, johnData);

/* ****************************************************************+
 5 coding challenge
 */

let johnBillObj = {
  name: 'John',
  billsArr: [124, 48, 268, 180, 42],
  tipsArr: [],
  totalBillArr: [],
  tipCalc() {
    let tipPercentage;
    let tip;
    let billAmount;
    for (let i = 0; i < this.billsArr.length; i++) {
      billAmount = this.billsArr[i];
      if (billAmount < 50) {
        tipPercentage = 0.2;
      } else if (50 <= billAmount <= 200) {
        tipPercentage = 0.15;
      } else {
        tipPercentage = 0.1;
      }
      tip = billAmount * tipPercentage;
      this.tipsArr.push(tip);
      this.totalBillArr.push(billAmount + tip);
    }
  },
};

let markBillObj = {
  name: 'Mark',
  billsArr: [77, 375, 110, 45],
  tipsArr: [],
  totalBillArr: [],
  tipCalc() {
    let tipPercentage;
    let tip;
    let billAmount;
    for (let i = 0; i < this.billsArr.length; i++) {
      billAmount = this.billsArr[i];
      if (billAmount < 100) {
        tipPercentage = 0.2;
      } else if (100 <= billAmount <= 300) {
        tipPercentage = 0.1;
      } else {
        tipPercentage = 0.25;
      }
      tip = billAmount * tipPercentage;
      this.tipsArr.push(tip);
      this.totalBillArr.push(billAmount + tip);
    }
  },
};

function avgTip(tipArr) {
  let tipSum = 0;
  for (let i = 0; i < tipArr.length; i++) {
    tipSum += tipArr[i];
  }
  // console.log(tipSum, tipArr);
  return tipSum / tipArr.length;
}

function compareTipAvg(obj1, obj2) {
  if (obj1.tipAvg < obj2.tipAvg) {
    console.log(`${obj2.name}'s family has a higher tip average.`);
  } else if (obj1.tipAvg > obj2.tipAvg) {
    console.log(`${obj1.name}'s family has a higher tip average.`);
  } else {
    console.log('Both families have the same tip average.');
  }
}

johnBillObj.tipCalc();
markBillObj.tipCalc();
johnBillObj.tipAvg = avgTip(johnBillObj.tipsArr);
markBillObj.tipAvg = avgTip(markBillObj.tipsArr);
compareTipAvg(johnBillObj, markBillObj);
// console.log(johnBillObj);
// console.log(markBillObj);
