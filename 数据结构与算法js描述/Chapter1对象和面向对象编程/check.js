function Checking(amount) { 
    this.balance = amount; 
    this.deposit = deposit;
    this.withdraw = withdraw; 
    this.toString = toString;
}
function deposit(amount) { 
    this.balance += amount;
}
function withdraw(amount) {
    if (amount <= this.balance) { 
        this.balance -= amount;
    }
    if (amount > this.balance) { 
        print("Insufficient funds");
    }
}
function toString() {
    return "Balance: " + this.balance;
}
var account = new Checking(500);
print(account.balance);
account.deposit(1000);
print(account.balance);
print(account.toString()); //Balance: 1500 account.withdraw(750); print(account.toString()); // 余额：750 account.withdraw(800); // 显示余额不足print(account.toString()); // 余额：750
