const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

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

function generateReadMe(answers) {

    return `
    # ${answers.project}
    [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://${answers.url})
    ​
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

init();