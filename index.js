import inquirer from "inquirer";
import chalk from "chalk";
const users = [{ accNumber: 12345, pin: 1234, balance: 0 }];
let currentUser;
let transactions = [];
function LoginPage() {
    console.log(chalk.bgRedBright.bold.italic("            WELCOME TO NUMAN'S BANKING SYSTEM!               "));
    const answers = inquirer.prompt([
        {
            name: "selected",
            type: "list",
            choices: ["LOGIN", "SIGN UP"],
            message: "IF YOU HAVE ACCOUNT SELECT LOGIN ELSE GO FOR SIGNUP",
        },
    ]);
    answers.then((answers) => {
        if (answers.selected == "LOGIN") {
            Login();
        }
        else {
            SignUp();
        }
    });
}
function Login() {
    console.log(chalk.bgMagentaBright.bold.underline("                    SignIn Page                   "));
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
                    console.log(chalk.bgGreen.bold("Successfully login"));
                    Home();
                }
                else {
                    console.log(chalk.bgRed.bold("Incorrect Password"));
                }
            }
            else {
                console.log(chalk.bgRed.bold("Account Not Found"));
            }
        });
    });
}
function SignUp() {
    console.log(chalk.bgMagentaBright.bold.underline("                    Signup Page                   "));
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
            console.log(chalk.bgRed.bold("Invalid Account Number!"));
        }
        else {
            const newUser = { accNumber: ans.AccNumber, pin: ans.Pin, balance: 0 };
            users.push(newUser);
            currentUser = ans.AccNumber;
            console.log(chalk.bgGreenBright.bold("          Account Created Successfully!               "));
            Home();
        }
    })
        .catch((err) => {
        console.log(err);
    });
}
LoginPage();
function Home() {
    console.log(chalk.bgRedBright.bold.underline("                Select Your Choice             "));
    const answers = inquirer.prompt([
        {
            name: "func",
            type: "list",
            choices: [
                "Check Balance",
                "Add Balance",
                "Withdraw Balance",
                "Check Transaction History",
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
            default:
                break;
        }
    });
}
function checkBalance() {
    users.map((user) => {
        if (user.accNumber == currentUser) {
            console.log(chalk.bgCyan(`  Your Current Amount is : ${user.balance}    `));
        }
    });
    askTransaction();
}
function addBalance() {
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
                console.log("Amount Added to your account");
                transactions.push(`${ans.bal} amount added to your account`);
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
                    console.log("You Don't Have Enough Balance");
                }
                else {
                    user.balance = user.balance - ans.bal;
                    transactions.push(`${ans.bal} amount withdraw from your account`);
                    console.log(`successfully ${ans.bal} Amount withdraw from your Account`);
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
            console.log("Thank Your For Using Our Bank and Hope We will See you Again :)");
        }
    });
}
