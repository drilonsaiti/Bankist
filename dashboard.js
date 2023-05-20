'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2023-01-28T09:15:04.904Z',
    '2023-04-01T10:17:24.185Z',
    '2023-05-08T14:11:59.604Z',
    '2023-05-10T17:01:17.194Z',
    '2023-05-11T23:36:17.929Z',
    '2023-05-12T10:51:36.790Z'
  ],
  currency: 'EUR',
  locale: 'pt-PT'
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z'
  ],
  currency: 'USD',
  locale: 'en-US'
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2020-09-01T13:15:33.035Z',
    '2020-09-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2021-06-05T16:33:06.386Z',
    '2021-09-10T14:43:26.374Z',
    '2023-05-25T18:49:59.371Z',
    '2023-02-26T12:01:20.894Z'
  ],
  currency: 'EUR',
  locale: 'en-US'
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2021-02-05T16:33:06.386Z',
    '2021-04-10T14:43:26.374Z',
    '2023-01-25T18:49:59.371Z',
    '2023-03-26T12:01:20.894Z'
  ],
  currency: 'EUR',
  locale: 'en-US'
};

let accounts = [account1, account2, account3, account4];

/*const account1 = {
    owner: "Jonas Schmedtmann",
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        "2019-11-18T21:31:17.178Z",
        "2019-12-23T07:42:02.383Z",
        "2023-01-28T09:15:04.904Z",
        "2023-04-01T10:17:24.185Z",
        "2023-05-08T14:11:59.604Z",
        "2023-05-10T17:01:17.194Z",
        "2023-05-11T23:36:17.929Z",
        "2023-05-12T10:51:36.790Z",
    ],
    currency: "EUR",
    locale: "pt-PT", // de-DE
};

const account2 = {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        "2019-11-01T13:15:33.035Z",
        "2019-11-30T09:48:16.867Z",
        "2019-12-25T06:04:23.907Z",
        "2023-01-25T14:18:46.235Z",
        "2020-02-05T16:33:06.386Z",
        "2020-04-10T14:43:26.374Z",
        "2020-06-25T18:49:59.371Z",
        "2020-07-26T12:01:20.894Z",
    ],
    currency: "USD",
    locale: "en-US",
};

const accounts = [account1, account2];*/

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnLoginIndex = document.querySelector('.btn--login');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling']
]);

const acc =JSON.parse(localStorage.getItem('accounts'));
accounts.push(acc);
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const createUsernames = function(accs) {
  accs.forEach(acc => {
    acc.username = acc.owner.toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

/////////////////////////////////////////////////
const now = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: '2-digit',
  month: 'numeric',
  year: 'numeric'
  // weekday: 'long'
};
const locale = navigator.language;
const startLogOutTimer = function() {


  const tick = function() {
    const min = Math.trunc(timer / 60).toString().padStart(2, '0');
    const sec = (timer % 60).toString().padStart(2, '0');
    labelTimer.textContent = `${min}:${sec}`;


    if (timer === 0) {
      clearInterval(time);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    timer--;
  };
  let timer = 300;
  const time = setInterval(tick, 1000);

  return time;
};
const formatMovementDate = (date) => {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    return Intl.DateTimeFormat(locale).format(date);
  }
};


const displayMovements = function(acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date);
    labelDate.textContent = new Intl.DateTimeFormat(acc.locale, options).format(now);
    const html = `
        <div class='movements__row'>
          <div class='movements__type movements__type--${type}'>${i + 1} ${type}</div>
          <div class='movements__date'>${displayDate}</div>
          <div class='movements__value'>${Math.floor(mov).toFixed(0)}€</div>
        </div>
      `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//displayMovements(account1.movements)

const calcPrintBalance = function(acc) {
  const balance = acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${Math.floor(balance).toFixed(0)}€`;
};

//calcPrintBalance(account1.movements)

const calcDisplaySummary = function(acc) {
  const incomes = acc.movements.filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${Math.floor(incomes).toFixed(0)}€`;

  const outcomes = acc.movements.filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${Math.floor(Math.abs(outcomes)).toFixed(0)}€`;

  const interest = acc.movements.filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate / 100)
    .filter(int => int >= 1)
    .reduce((acc, curr) => acc + curr, 0);

  labelSumInterest.textContent = `${Math.floor(interest).toFixed(0)}€`;
};

//calcDisplaySummary(account1.movements)


const updateUI = function(acc) {
  displayMovements(acc);
  calcPrintBalance(acc);
  calcDisplaySummary(acc);
};

let currentAccount, timer;

//FAKE ALWAYS LOGGED IN


//`${now.getDay().toString().padStart(2, 0)}/${now.getMonth()}/${now.getFullYear()}, ${now.getHours()}:${now.getMinutes().toString().padStart(2,0)}`;
if (localStorage.getItem('username') != null){
  currentAccount = accounts.find(acc => acc.username === localStorage.getItem('username'));
  console.log(currentAccount);
  if (currentAccount?.pin === Number(localStorage.getItem('pin'))) {
    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    inputLoginUsername.value = inputLoginPin.value = '';
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    updateUI(currentAccount);
  }
}
if (btnLogin) {
  btnLogin.addEventListener('click', function(e) {
    e.preventDefault();
    currentAccount = "";
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
      labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`;
      containerApp.style.opacity = 100;

      inputLoginUsername.value = inputLoginPin.value = '';
      if (timer) clearInterval(timer);
      timer = startLogOutTimer();

      updateUI(currentAccount);
    }
  });
}

/*if (btnLoginIndex){
    btnLoginIndex.addEventListener('click', function(e) {
        e.preventDefault();
        // Redirect to another HTML file
        window.location.href = "dashboard.html";
      console.log(localStorage.getItem('username'))

    });
}*/
console.log(accounts[4])
console.log(localStorage.getItem('username'))


if (btnTransfer)
  btnTransfer.addEventListener('click', function(e) {
    e.preventDefault();

    const amount = Number(inputTransferAmount.value);
    const reciverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

    inputTransferTo.value = inputTransferAmount.value = '';

    if (amount > 0 && currentAccount.balance >= amount && reciverAcc
      && reciverAcc.username !== currentAccount.username) {
      currentAccount.movements.push(-amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      reciverAcc.movements.push(amount);
      reciverAcc.movementsDates.push(new Date().toISOString());

      updateUI(currentAccount);
    }
    clearInterval(timer);
    timer = startLogOutTimer();
  });

if (btnLoan)
  btnLoan.addEventListener('click', function(e) {
    e.preventDefault();
    const loanAmount = Number(inputLoanAmount.value);
    inputLoanAmount.value = '';
    if (loanAmount > 0 && currentAccount.movements.some(mov => mov >= loanAmount * 0.1)) {
      setTimeout(function() {
        currentAccount.movements.push(loanAmount);
        currentAccount.movementsDates.push(new Date().toISOString());

        updateUI(currentAccount);
      }, 3000);
    }
    clearInterval(timer);
    timer = startLogOutTimer();

  });

if (btnClose)
  btnClose.addEventListener('click', function(e) {
    e.preventDefault();
    const closeUsername = inputCloseUsername.value;
    const closePin = inputClosePin.value;

    if (closeUsername && closeUsername === currentAccount.username &&
      closePin && Number(closePin) === currentAccount.pin) {
      const index = accounts.findIndex(acc => acc.username === currentAccount.username);
      accounts.splice(index, 1);
      containerApp.style.opacity = 0;
    }
    inputCloseUsername.value = inputClosePin.value = '';
  });

let sorted = false;

if (btnSort)
  btnSort.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('btn sort');
    //console.log(displayMovements(currentAccount, !sorted))
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
  });





console.log(accounts);
