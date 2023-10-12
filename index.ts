// Develop a TS program that show the working of an ATM machine such

import inquirer, { Answers } from "inquirer";

//  - User should login by entering his/her unique account number and a secret PIN
// - User can check account balance
// - User can withdraw money
// - User can check his/her previous transactions in the current login
// - User should be asked at the end of each function that if he/she wants to end transections or perform any other transections if the user choose more transections he/she must be shown all the options again and he / she can perform any transections.

// In the current login means if user logged in and performed 5 transections he/she have an option to check these 5 transections
// If he/she choosed to end the transections the data should be removed.

interface UserType {
  accNumber: number;
  pin: number;
  balance: number;
}
const users: UserType[] = [{ accNumber: 12345, pin: 1234, balance: 0 }];
let currentUser: number;
let transactions: string[] = [];
function LoginPage() {
  const answers: Promise<Answers> = inquirer.prompt([
    {
      name: "selected",
      type: "list",
      choices: ["LOGIN", "SIGN UP"],
      message: "WELCOME TO ATM BANK",
    },
  ]);
  answers.then((answers) => {
    if (answers.selected == "LOGIN") {
      Login();
    } else {
      SignUp();
    }
  });
}

function Login() {
  const answers: Promise<Answers> = inquirer.prompt([
    {
      name: "AccNumber",
      type: "number",
      message: "Enter Your Account Number : ",
    },
    {
      name: "Pin",
      type: "number",
      message: "Enter Your Pin code : ",
    },
  ]);
  answers.then((ans) => {
    users.map((user) => {
      if (user.accNumber == ans.AccNumber) {
        if (user.pin == ans.Pin) {
          currentUser = user.accNumber;
          console.log("User Successfully login");
          Home();
        } else {
          console.log("incorrect Password");
        }
      } else {
        console.log("Account Not Found");
      }
    });
  });
}

function SignUp() {
  console.log("Signup Page");

  const answers: Promise<Answers> = inquirer.prompt([
    {
      name: "AccNumber",
      type: "number",
      message: "Enter Your Account Number : ",
    },
    {
      name: "Pin",
      type: "number",
      message: "Enter Your Pin code : ",
    },
  ]);
  answers.then((ans) => {
    const newUser = { accNumber: ans.AccNumber, pin: ans.Pin, balance: 0 };
    users.push(newUser);
    currentUser = ans.AccNumber;
    console.log("Account Created");
    Home();
  });
}

LoginPage();

function Home() {
  console.log("Enter Your Choice");
  const answers: Promise<Answers> = inquirer.prompt([
    {
      name: "func",
      type: "list",
      choices: [
        "Check Balance",
        "Add Balance",
        "Withdraw Balance",
        "Check Transaction History",
      ],
      message: "WELCOME TO ATM BANK",
    },
  ]);

  answers.then((ans) => {
    switch (ans.func) {
      case "Check Balance":
        checkBalance();
        break;
      case "Add Balance":
        addBalance();
        break;
      case "Withdraw Balance":
        withdrawBalance();
        break;
      case "Check Transaction History":
        TransactionHistory();
        break;

      default:
        break;
    }
  });
}

function checkBalance() {
  console.log(users);
  console.log(currentUser);

  users.map((user) => {
    if (user.accNumber == currentUser) {
      console.log(`Your Current Amount is : ${user.balance}`);
    }
  });
  askTransaction();
}
function addBalance() {
  const answers: Promise<Answers> = inquirer.prompt([
    {
      name: "bal",
      type: "number",
      message: "Enter Balance you want to add into your account : ",
    },
  ]);

  answers.then((ans) => {
    users.map((user) => {
      if (user.accNumber == currentUser) {
        user.balance = user.balance + ans.bal;
        console.log("Amount Added to your account");
        transactions.push(`${ans.bal} amount added to your account`);
      }
    });
    askTransaction();
  });
}
function withdrawBalance() {
  const answers: Promise<Answers> = inquirer.prompt([
    {
      name: "bal",
      type: "number",
      message: "Enter Balance you want to Withdraw : ",
    },
  ]);

  answers.then((ans) => {
    users.map((user) => {
      if (user.accNumber == currentUser) {
        if (user.balance < ans.bal) {
          console.log("You Don't Have Enough Balance");
        } else {
          user.balance = user.balance - ans.bal;
          transactions.push(`${ans.bal} amount withdraw from your account`);

          console.log(
            `successfully ${ans.bal} Amount withdraw from your Account`
          );
        }
      }
    });
    askTransaction();
  });
}
function TransactionHistory() {
  transactions.map((item) => {
    console.log(item);
  });
  askTransaction();
}

function askTransaction() {
  const answers: Promise<Answers> = inquirer.prompt([
    {
      name: "selected",
      type: "list",
      choices: ["Yes", "No"],
      message: "Do you want to do more transactions?",
    },
  ]);
  answers.then((answer) => {
    if (answer.selected == "Yes") {
      Home();
    } else {
      console.log("Thank Your For Using Our Bank ");
    }
  });
}
