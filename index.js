#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const users = [
    { accNumber: 12345, pin: 1234, balance: 0, transactions: [] },
];
let currentUser;
// let transactions: string[] = [];
function LoginPage() {
    console.log(chalk.black
        .bgHex("#e9edc9")
        .bold.italic("            WELCOME TO NUMAN'S BANKING SYSTEM!               "));
    const answers = inquirer.prompt([
        {
            name: "selected",
            type: "list",
            choices: ["SIGN IN", "SIGN UP", "EXIT"],
            message: "IF YOU HAVE ACCOUNT SELECT LOGIN ELSE GO FOR SIGNUP",
        },
    ]);
    answers.then((answers) => {
        if (answers.selected == "SIGN IN") {
            Login();
        }
        else if (answers.selected == "SIGN UP") {
            SignUp();
        }
        else {
            console.log(chalk.black
                .bgHex("#83c5be")
                .bold("Thank Your For Using Our Bank and Hope We will See you Again :)"));
        }
    });
}
function Login() {
    console.log(chalk.black
        .bgHex("#ccd5ae")
        .bold.underline("                    SIGN IN PAGE                   "));
    const answers = inquirer.prompt([
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
                    console.log(chalk.black.bgHex("#80b918").bold("    Successfully login    "));
                    Home();
                }
                else {
                    console.log(chalk.black.bgHex("#c1121f").white.bold("  Incorrect Password  "));
                }
            }
        });
        if (!currentUser) {
            console.log(chalk.black.bgHex("#c1121f").white.bold("Account Not Found"));
        }
    });
}
function SignUp() {
    console.log(chalk.black
        .bgHex("#ccd5ae")
        .bold.underline("                    SIGN UP PAGE                   "));
    const answers = inquirer.prompt([
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
    answers
        .then((ans) => {
        if (!ans.AccNumber) {
            console.log(chalk.black.bgHex("#c1121f").white.bold("Invalid Account Number!"));
        }
        else {
            const newUser = {
                accNumber: ans.AccNumber,
                pin: ans.Pin,
                balance: 0,
                transactions: [],
            };
            users.push(newUser);
            currentUser = ans.AccNumber;
            console.log(chalk.black
                .bgHex("#80b918")
                .bold("          Account Created Successfully!               "));
            Home();
        }
    })
        .catch((err) => {
        console.log(err);
    });
}
LoginPage();
function Home() {
    console.log(chalk.black
        .bgHex("#ccd5ae")
        .bold.underline("                Select Your Choice             "));
    const answers = inquirer.prompt([
        {
            name: "func",
            type: "list",
            choices: [
                "Check Balance",
                "Add Balance",
                "Withdraw Balance",
                "Check Transaction History",
                "LOGOUT",
            ],
            message: "Numan's Banking System",
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
            case "LOGOUT":
                LoginPage();
            default:
                break;
        }
    });
}
function checkBalance() {
    users.map((user) => {
        if (user.accNumber == currentUser) {
            console.log(chalk.black
                .bgHex("#a2d2ff")
                .bold(`  Your Current Amount is : ${user.balance}    `));
        }
    });
    askTransaction();
}
function addBalance() {
    console.log(chalk.black
        .bgHex("#ccd5ae")
        .bold.underline("       ADD BALANCE TO YOUR ACCOUNT         "));
    const answers = inquirer.prompt([
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
                console.log(chalk.black
                    .bgHex("#80b918")
                    .bold(`${ans.bal} Amount successfully Added to your account`));
                user.transactions.push(`${ans.bal} amount added to your account`);
            }
        });
        askTransaction();
    });
}
function withdrawBalance() {
    const answers = inquirer.prompt([
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
                    console.log(chalk.black
                        .bgHex("#c1121f")
                        .white.bold("You Don't Have Enough Balance"));
                }
                else {
                    user.balance = user.balance - ans.bal;
                    user.transactions.push(`${ans.bal} amount withdraw from your account`);
                    console.log(chalk.black
                        .bgHex("#80b918")
                        .bold(`successfully ${ans.bal} Amount withdraw from your Account`));
                }
            }
        });
        askTransaction();
    });
}
function TransactionHistory() {
    users.map((user) => {
        if (user.accNumber == currentUser) {
            if (user.transactions.length == 0) {
                console.log(chalk.black.bgYellow.bold("        you have not made any transaction!          "));
            }
            else {
                user.transactions.map((item, i) => {
                    console.log(chalk.black.bgHex("#ccd5ae").bold(`${i + 1}. ${item}`));
                });
            }
        }
    });
    askTransaction();
}
function askTransaction() {
    const answers = inquirer.prompt([
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
        }
        else {
            LoginPage();
        }
    });
}
