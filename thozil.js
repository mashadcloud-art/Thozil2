#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0];

function runCmd(cmd) {
  try {
    console.log(`\x1b[36mRunning: ${cmd}\x1b[0m`);
    execSync(cmd, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`\x1b[31mError executing: ${cmd}\x1b[0m`);
    return false;
  }
}

function showHelp() {
  console.log(`
\x1b[35m=== Thozil CLI Tool ===\x1b[0m
Usage:
  \x1b[33mthozil commit [message]\x1b[0m   Stage all changes, commit, and push to GitHub.
  \x1b[33mthozil deploy\x1b[0m           Pull latest changes from main branch, install dependencies, and build.
  \x1b[33mthozil --help\x1b[0m           Show this help menu.
`);
}

async function handleCommit() {
  console.log('\x1b[32m=== Starting Commit Process ===\x1b[0m');

  // 1. Git Add
  if (!runCmd('git add -A')) {
    console.error('\x1b[31mFailed to stage changes.\x1b[0m');
    process.exit(1);
  }

  // 2. Get Commit Message
  let message = args.slice(1).join(' ');
  if (!message) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    message = await new Promise((resolve) => {
      rl.question('\x1b[33mEnter commit message: \x1b[0m', (answer) => {
        rl.close();
        resolve(answer.trim());
      });
    });
  }

  if (!message) {
    message = `Updates pushed via Thozil CLI on ${new Date().toLocaleString()}`;
    console.log(`\x1b[34mNo message provided. Using default: "${message}"\x1b[0m`);
  }

  // 3. Git Commit
  const escapedMessage = message.replace(/"/g, '\\"');
  if (!runCmd(`git commit -m "${escapedMessage}"`)) {
    console.error('\x1b[31mFailed to commit changes. (Check if there is anything to commit)\x1b[0m');
    process.exit(1);
  }

  // 4. Git Push
  if (!runCmd('git push origin main')) {
    console.error('\x1b[31mFailed to push to GitHub.\x1b[0m');
    process.exit(1);
  }

  console.log('\x1b[32m✔ Successfully committed and pushed to GitHub!\x1b[0m');
}

function handleDeploy() {
  console.log('\x1b[32m=== Starting Deploy Process ===\x1b[0m');

  // 1. Pull changes
  if (!runCmd('git pull origin main')) {
    console.error('\x1b[31mFailed to pull from GitHub.\x1b[0m');
    process.exit(1);
  }

  // 2. Detect packages & dependencies tool
  let installCmd = 'npm install';
  let buildCmd = 'npm run build';

  if (fs.existsSync(path.join(__dirname, 'pnpm-workspace.yaml')) || fs.existsSync(path.join(__dirname, 'pnpm-lock.yaml'))) {
    installCmd = 'pnpm install --frozen-lockfile';
    buildCmd = 'pnpm run build';
  } else if (fs.existsSync(path.join(__dirname, 'yarn.lock'))) {
    installCmd = 'yarn install --frozen-lockfile';
    buildCmd = 'yarn build';
  }

  // 3. Install Dependencies
  if (!runCmd(installCmd)) {
    console.error('\x1b[31mDependency installation failed.\x1b[0m');
    process.exit(1);
  }

  // 4. Build Project
  if (!runCmd(buildCmd)) {
    console.error('\x1b[31mProject build failed.\x1b[0m');
    process.exit(1);
  }

  console.log('\x1b[32m✔ Thozil website successfully built and deployed on production server!\x1b[0m');
}

async function main() {
  if (command === 'commit') {
    await handleCommit();
  } else if (command === 'deploy') {
    handleDeploy();
  } else {
    showHelp();
  }
}

main();
