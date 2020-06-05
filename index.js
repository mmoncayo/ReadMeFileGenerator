// install all the dependencies needed
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

// define function needed to write a file using the promisify method
const writeFileAsync = util.promisify(fs.writeFile);


// the function to prompt the user to answer the questions needed to generate the README.md file
function promptUser() {
    return inquirer
        .prompt([
            {
                type: "input",
                message: "What is your GitHub username?",
                name: "github"
            },
            {
                type: "input",
                message: "What is your email?",
                name: "email"
            },
            {
                type: "input",
                message: "What's the URL to your project?",
                name: "url"
            },
            {
                type: "input",
                message: "What is your project's name?",
                name: "project"
            },
            {
                type: "input",
                message: "Please write a short description of your project",
                name: "description"
            },            
            {
                type: "list",
                message: "What kind of license should your project have?",
                name: "license",
                choices: [
                    "MIT",
                    "APACHE 2.0",
                    "GPL 3.0",
                    "BSD 3",
                    "None"
                  ]
            },
            {
                type: "input",
                message: "What command should be ran to install dependencies?",
                name: "installation",
                default: "npm install"
            },
            {
                type: "input",
                message: "What command should be ran to run tests?",
                name: "test",
                default: "npm test"
            },
            {
                type: "input",
                message: "What does the user need to know about using the repo?",
                name: "usage"
            },
            {
                type: "input",
                message: "What does the user need to know about contributing to the repo?",
                name: "contribution"
            }
        ]);
}

// gives the format for how the readme file will be generated and includes the template literals for all of the answers
function generateReadMe(answers) {

    return `
    # ${answers.project}
    [![GitHub license](https://img.shields.io/badge/license-${answers.license}-blue.svg)](https://${answers.url})

    ## Description
    ​
    ${answers.description}
    ​
    ## Table of Contents 
    ​
    * [Installation](#installation)
    ​
    * [Usage](#usage)
    ​
    * [License](#license)
    ​
    * [Contributing](#contributing)
    ​
    * [Tests](#tests)
    ​
    * [Questions](#questions)
    ​
    ## Installation
    ​
    To install necessary dependencies, run the following command:
    ​
    \`\`\`
    ${answers.installation}
    \`\`\`
    ​
    ## Usage
    ​
    ${answers.usage}
    ​
    ## License
    ​
    This project is licensed under the ${answers.license} license.
      
    ## Contributing
    ​
    ${answers.contribution}
    ​
    ## Tests
    ​
    To run tests, run the following command:
    ​
    \`\`\`
    ${answers.test}
    \`\`\`
    ​
    ## Questions
    ​
    If you have any questions about the repo, open an issue or contact [${answers.github}](undefined) directly at ${answers.email}.`;
}

// async function that will initiate the program when ran and will console log a sucessful message if the readme file is generated
async function init() {
    //console.log('hi');
    try {
        const answers = await promptUser();
        const readMe = generateReadMe(answers);

        await writeFileAsync("README.md", readMe);

        console.log("Successfully wrote to README.md");
    }
    catch (err) {
        console.log(err);
    }
}

// runs the program
init();