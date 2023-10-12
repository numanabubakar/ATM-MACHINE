// Develop a TS program that show the working of an ATM machine such
import inquirer from "inquirer";
//  - User should login by entering his/her unique account number and a secret PIN
// - User can check account balance
// - User can withdraw money
// - User can check his/her previous transections in the current login
// - User should be asked at the end of each function that if he/she wants to end transections or perform any other transections if the user choose more transections he/she must be shown all the options again and he / she can perform any transections.
// In the current login means if user logged in and performed 5 transections he/she have an option to check these 5 transections
// If he/she choosed to end the transections the data should be removed.
const users = [{ accNumber: 12345, pin: 1234 }];
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
                    console.log("User Succesffuly login");
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
        const newUser = { accNumber: ans.AccNumber, pin: ans.Pin };
        users.push(newUser);
        console.log("Account Created");
    });
}
LoginPage();
