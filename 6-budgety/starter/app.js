

var budgetController = (function() {
  
  var Expenses = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expenses.prototype.calcPercentage = function(totalInc) {
    if (totalInc > 0) {
      this.percentage = Math.round((this.value / totalInc) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expenses.prototype.getPercentage = function() {
    return this.percentage;
  };

  var Incomes = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var sumArrValues = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(el) {
      sum += el.value;
    });
    data.totals[type] = Math.round(sum);
  };

  data = {
    allItems: {
      expense: [],
      income: [],
    },
    totals: {
      expense: 0,
      income: 0,
    },
    budget: 0,
    percentage: -1,
  };

  return {
    addItem: function(type, descrpt, val) {
      var newItem, ID;

      // create ID
      // [1, 2, 3, 4, 5] next ID will be the last ID of the array plus one
      // if one item is deleted e.g, [1, 2, 3, 5], then for a new ID, it will have to be the last ID of the array plus one
      // [1, 2, 3, 5, 6 (not 5 again!)]
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1; 
      } else {
        ID = 0;
      }

      // Create new item and add to respective arrays
      if (type === 'expense') {
        newItem = new Expenses(ID, descrpt, val);
      } else if (type === 'income') {
        newItem = new Incomes(ID, descrpt, val);
      }
      
      data.allItems[type].push(newItem);

      return newItem;
    },

    deleteItem: function(type, id) {
      var itemsArr, idArr, index;

      // get the array with all the income/expense items
      itemsArr = data.allItems[type];
      // get an array only with their respective ids
      idArr = itemsArr.map(function(element) {
        return element.id;
      });
      // get the exact index of the id of the element that was selected to be deleted. The index will be the same on the data structure.
      index = idArr.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }

    },

    calculateBudget: function() {

      // 1. Calculate income and expenses
      sumArrValues('expense');
      sumArrValues('income');
      // 2. calculate budget
      data.budget = data.totals.income - data.totals.expense;
      // 3. calculate percentage 
      if (data.totals.income > 0) {
        data.percentage = Math.round((data.totals.expense / data.totals.income) * 100);
      }

    },

    calculatePercentages: function() {
      data.allItems.expense.forEach(function(element) {
        element.calcPercentage(data.totals.income);
      })
    },

    getPercentagesData: function() {
      var percentagesArr;
      percentagesArr = data.allItems.expense.map(function(element) {
        return element.getPercentage();
      });
      return percentagesArr;
    },

    getBudgetData: function() {
      return {
        income: data.totals.income,
        expenses: data.totals.expense,
        budget: data.budget,
        percentage: data.percentage,
      };
    },
    testing: function() {
      return data;
    },
  };

})();


var UIController = (function() {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputAddBtn: '.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list',
    budgetLabel:'.budget__value',
    incomeLabel:'.budget__income--value',
    expensesLabel:'.budget__expenses--value',
    percentageLabel:'.budget__expenses--percentage',
    listContainer: '.container',
    expItemPercentageLabel: '.item__percentage',
    dateLabel: '.budget__title--month',
  };

  var formatNumber = function(num, type) {
    var splitNum, int, dec;

    // 1. get absolute number
    num = Math.abs(num);
    // 2. fix number to 2 decimals digits
    num = num.toFixed(2);
    // 3. split integer from decimal portion and format integer on the thousands. Adapted for numbers below the million mark
    splitNum = num.split('.');
    int = splitNum[0];
    if (int.length > 3) {
      int = int.substring(0, int.length - 3) + ',' + int.substring(int.length - 3);
    }

    dec = splitNum[1];

    return (type === 'expense' ? '-' : '+') + ' ' + int + '.' + dec;
  };

  var nodeListForEach = function(list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  
  return {
    getInput: function() {
      return {
        inputType: document.querySelector(DOMstrings.inputType).value,
        inputDescription: document.querySelector(DOMstrings.inputDescription).value,
        inputValue: parseFloat(document.querySelector(DOMstrings.inputValue).value),
      }
    },
    addItemUI: function(itemObj, type) {
      var html, newHTML, containerID;

      // 1. Create placeholder HTML
      if (type === 'expense') {
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'income') {
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // 2. Replace placeholder HTML with the received data
      newHTML = html.replace('%id%', itemObj.id);
      newHTML = newHTML.replace('%description%', itemObj.description);
      newHTML = newHTML.replace('%value%', formatNumber(itemObj.value, type));

      // 3. Add new HTML to html file
      if (type === 'expense') {
        containerID = DOMstrings.expenseContainer;
        document.querySelector(containerID).insertAdjacentHTML('beforeend', newHTML);
      } else if (type === 'income') {
        containerID = DOMstrings.incomeContainer;
        document.querySelector(containerID).insertAdjacentHTML('beforeend', newHTML);
      }

    },

    deleteItemUI: function(itemID) {
      var selectedItem = document.getElementById(itemID);
      selectedItem.parentNode.removeChild(selectedItem);
    },

    clearFields: function() {
      var fields, fieldsArr;
      // Select the field to be cleared
      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
      // Change the nodeList to an Array type
      fieldsArr = Array.prototype.slice.call(fields);
      // iterate and clear fields
      fieldsArr.forEach(function(e) {
        e.value = '';
      });

      fieldsArr[0].focus();

    },

    updateBudgetUI: function(obj) {

      var type;
      if (obj.budget > 0) {
        type = 'income';
      }

      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.income, 'income');
      document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.expenses, 'expense');

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '--';
      }
    },

    updatePercentages: function(percentages) {
      var expItems;

      expItems = document.querySelectorAll(DOMstrings.expItemPercentageLabel);

      nodeListForEach(expItems, function(element, index) {
        if (percentages[index] > 0) {
          element.textContent = percentages[index] + '%'
        } else {
          element.textContent = '--';
        }  
      })
    },

    udpateDate: function() {
      var date, year, month, monthArr;
      monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      date = new Date();
      year = date.getFullYear();
      month = date.getMonth();

      document.querySelector(DOMstrings.dateLabel).textContent = monthArr[month] + ' ' + year;

    },

    toggleElementColor: function() {

      var fields = document.querySelectorAll(
        DOMstrings.inputType + ',' +
        DOMstrings.inputDescription + ',' +
        DOMstrings.inputValue
      );

      nodeListForEach(fields, function(element) {
        element.classList.toggle('red-focus');
      });

      document.querySelector(DOMstrings.inputAddBtn).classList.toggle('red');

    },

    getDOMstrings: function() {
      return DOMstrings;
    },
  }

})();


var controller = (function(budgetCtrl, UICtrl) {

  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.inputAddBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(e) {
      if(e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });

    document.querySelector(DOM.listContainer).addEventListener('click', ctrlDeleteItem);
    document.querySelector(DOM.inputType).addEventListener('change', UICtrl.toggleElementColor);

  };  
  
  var updateBudget = function() {
    var budgetData;
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();
    // 2. Return the budget
    budgetData = budgetCtrl.getBudgetData();
    // 3. Display the budget on the UI
    UICtrl.updateBudgetUI(budgetData);
  };

  var updatePercentages = function() {
    var ExpPercentages;
    // 1. Calculate the percentages
    budgetCtrl.calculatePercentages();
    // 2. Read percentages from the budget controller
    ExpPercentages = budgetCtrl.getPercentagesData();
    // 3. update the UI with the percentages
    UICtrl.updatePercentages(ExpPercentages);
  };

  var ctrlAddItem = function() {    
    var inputData, newItem;
    // 1. Get the field input data
    inputData = UICtrl.getInput();

    if (inputData.inputDescription !== '' && !isNaN(inputData.inputValue) && inputData.inputValue > 0) {
      // 2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(inputData.inputType, inputData.inputDescription, inputData.inputValue);
      // 3. Add the item to the UI and clear input fields
      UICtrl.addItemUI(newItem, inputData.inputType);
      UICtrl.clearFields();
      // 4. Calculate the budget and percentages and display it on the UI
      updateBudget();
      updatePercentages();
    }
    
  };

  var ctrlDeleteItem = function(event) {
    var itemID, itemData, type, id;
    
    // use DOM traversing to select the parentNode of the target element with the ID
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    // Since only the select parent node of the target element has an id, then the remaining code only runs when the icon/button is clicked
    if (itemID) {
      itemData = itemID.split('-');
      type = itemData[0];
      id = parseInt(itemData[1]);
  
      // 1. delete the item from the data structure
      budgetCtrl.deleteItem(type, id);

      // 2. delete the item from the UI
      UICtrl.deleteItemUI(itemID);

      // 3. update and show the new budget and percentages
      updateBudget();
      updatePercentages();
    }

  };

  return {
    init: function() {
      setupEventListeners();
      UICtrl.udpateDate();
      UICtrl.updateBudgetUI({
        income: 0,
        expenses: 0,
        budget: 0,
        percentage: -1,
      });
    },
  };

})(budgetController, UIController);

controller.init();
