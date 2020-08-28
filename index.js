let balance = 500.00;

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed) {
      this.time = new Date();
      this.account.addTransaction(this);
    }
  }

}

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

  get balance() {
    let sum = 0;
    for (let transaction of this.transactions) {
      sum += transaction.value;
    }
    return sum;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -1 * this.amount;
  }

  get isAllowed() {
    return this.amount <= this.account.balance;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  get isAllowed() {
    return true;
  }

}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account('snow-patrol');

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

t4 = new Withdrawal(20.00, myAccount);
t4.commit();
console.log('Transaction 4:', t4);

console.log('Balance:', myAccount.balance);
