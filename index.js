// Develop a TS program that show the working of an ATM machine such
import inquirer from "inquirer";
const users = [{ accNumber: 12345, pin: 1234, balance: 0 }];
let currentUser;
let transactions = [];
function LoginPage() {
    const answers = inquirer.prompt([
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
        }
        else {
            SignUp();
        }
    });
}
function Login() {
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
                    console.log("User Successfully login");
                    Home();
                }
                else {
                    console.log("incorrect Password");
                }
            }
            else {
                console.log("Account Not Found");
            }
        });
    });
}
function SignUp() {
    console.log("Signup Page");
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
                user.balance = ans.bal;
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
            console.log("Thank Your For Using Our Bank ");
        }
    });
}
