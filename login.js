/*
import { accounts,createUsernames } from './Dashboard/dashboard.js';

const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const btnCreateAccount = document.querySelector('.btn-create-account');
const data = 'data';
/!*owner: 'Jessica Davis',
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
  locale: 'en-US'*!/

function generatePin(length) {
  var pin = "";

  for (var i = 0; i < 4; i++) {
    pin += length.toString();
  }

  return Number(pin);
}

btnCreateAccount.addEventListener('click',function(e) {
  e.preventDefault();
  console.log(data,firstName.value,lastName.value,email.value)
  const pin = generatePin(accounts.length + 1);
  accounts.push({
    owner: `${firstName.value} ${lastName.value}`,
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: generatePin(accounts.length + 1),
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
  })
  createUsernames(accounts);
  console.log(accounts[4]);
})
console.log(accounts)*/
