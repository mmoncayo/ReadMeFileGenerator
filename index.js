const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer
        .prompt([
            {
                type: "input",
                message: "What is your name?",
                name: "name"
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
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Hi! My name is ${answers.name}</h1>
    <p class="lead">I am from ${answers.location}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.github}</li>
      <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
    </ul>
  </div>
</div>
</body>
</html>`;
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