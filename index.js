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
                message: "Where are you from?",
                name: "location"
            },
            {
                type: "input",
                message: "What do you do for a living?",
                name: "bio"
            },
            {
                type: "input",
                message: "What is your LinkedIn URL?",
                name: "linkedin"
            },
            {
                type: "input",
                message: "What is your GitHub URL?",
                name: "github"
            }
        ]);
}

function generateReadMe(answers) {

    return `
    # test
    [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/blah/test)
    ​
    ## Description
    ​
    project about blah
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
    npm i
    \`\`\`
    ​
    ## Usage
    ​
    user needs to know blah
    ​
    ## License
    ​
    This project is licensed under the MIT license.
      
    ## Contributing
    ​
    user needs to contribute to blah
    ​
    ## Tests
    ​
    To run tests, run the following command:
    ​
    \`\`\`
    npm test
    \`\`\`
    ​
    ## Questions
    ​
    If you have any questions about the repo, open an issue or contact [blah](undefined) directly at blah@blah.com.`;
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