#!/usr/bin/env bun

import { spawn } from "bun";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  console.log("\n✨ Welcome to create-next-elysia!\n");
  console.log("Creating your Next.js + Elysia.js fullstack project...\n");

  // Get project name
  let projectName = process.argv[2];
  if (!projectName) {
    projectName = await question("📁 Project name: ");
    if (!projectName) {
      projectName = "my-next-elysia-app";
    }
  }

  // Get package manager preference
  console.log("\n📦 Select package manager:");
  console.log("1. bun (recommended)");
  console.log("2. npm");
  console.log("3. yarn");

  let pmChoice = await question("Choose (1-3) [default: 1]: ");
  let packageManager = "bun";

  if (pmChoice === "2") {
    packageManager = "npm";
  } else if (pmChoice === "3") {
    packageManager = "yarn";
  }

  // Ask if install now
  const installNow = await question(
    "\n⚙️  Install dependencies now? (yes/no) [default: yes]: "
  );
  const shouldInstall = installNow.toLowerCase() !== "no";

  console.log("\n📥 Setting up project...\n");

  // Create project directory
  const projectPath = path.resolve(projectName);

  if (fs.existsSync(projectPath)) {
    console.error(`❌ Directory "${projectName}" already exists!`);
    process.exit(1);
  }

  fs.mkdirSync(projectPath, { recursive: true });

  // Clone root repository with submodules
  console.log("📦 Cloning root repository with submodules...");
  try {
    const cloneProcess = spawn({
      cmd: [
        "git",
        "clone",
        "--recurse-submodules",
        "https://github.com/XAN44/next-elysia.git",
        projectPath,
      ],
      stdio: ["pipe", "pipe", "pipe"],
    });

    const exitCode = await cloneProcess.exited;
    if (exitCode !== 0) {
      throw new Error("Failed to clone repository");
    }
  } catch (error) {
    console.error("❌ Failed to clone repository:", error);
    process.exit(1);
  }

  console.log("✅ Repository cloned successfully!\n");

  if (shouldInstall) {
    // Install dependencies
    console.log(`📚 Installing dependencies with ${packageManager}...\n`);

    const cmd = packageManager === "npm" ? "npm" : packageManager;

    // Install root dependencies
    console.log("📦 Installing root dependencies...");
    try {
      const rootProcess = spawn({
        cmd: [cmd, "install"],
        cwd: projectPath,
        stdio: "inherit",
      });

      const rootExit = await rootProcess.exited;
      if (rootExit !== 0) {
        console.error("❌ Root install failed. Please run manually:");
        console.error(`   cd ${projectName} && ${cmd} install`);
      } else {
        console.log("✅ Root dependencies installed!\n");
      }
    } catch (error) {
      console.error("❌ Could not install root dependencies:", error);
      console.log(`Please run manually: cd ${projectName} && ${cmd} install`);
    }

    // Install back-end dependencies
    console.log("📦 Installing backend dependencies...");
    try {
      const backendPath = path.join(projectPath, "back-end/app");

      const backendProcess = spawn({
        cmd: [cmd, "install"],
        cwd: backendPath,
        stdio: "inherit",
      });

      const backendExit = await backendProcess.exited;
      if (backendExit !== 0) {
        console.error("❌ Backend install failed. Please run manually:");
        console.error(`   cd ${projectName}/back-end/app && ${cmd} install`);
      } else {
        console.log("✅ Backend dependencies installed!\n");
      }
    } catch (error) {
      console.error("❌ Could not install backend dependencies:", error);
      console.log(
        `Please run manually: cd ${projectName}/back-end/app && ${cmd} install`
      );
    }

    // Install front-end dependencies
    console.log("📦 Installing frontend dependencies...");
    try {
      const frontendPath = path.join(projectPath, "front-end/my-app");

      const frontendProcess = spawn({
        cmd: [cmd, "install"],
        cwd: frontendPath,
        stdio: "inherit",
      });

      const frontendExit = await frontendProcess.exited;
      if (frontendExit !== 0) {
        console.error("❌ Frontend install failed. Please run manually:");
        console.error(
          `   cd ${projectName}/front-end/my-app && ${cmd} install`
        );
      } else {
        console.log("✅ Frontend dependencies installed!\n");
      }
    } catch (error) {
      console.error("❌ Could not install frontend dependencies:", error);
      console.log(
        `Please run manually: cd ${projectName}/front-end/my-app && ${cmd} install`
      );
    }
  }

  // Success message
  console.log("\n🎉 Project created successfully!\n");
  console.log(`📁 Project location: ${projectPath}\n`);

  console.log("📖 Next steps:\n");
  console.log(`1. cd ${projectName}\n`);

  if (!shouldInstall) {
    console.log(`2. Install dependencies:\n`);
    console.log(`   # For backend:`);
    console.log(
      `   cd back-end/app && ${packageManager} install && cd ../..\n`
    );
    console.log(`   # For frontend:`);
    console.log(`   cd front-end/my-app && ${packageManager} install\n`);
  }

  console.log(`3. Start development servers:\n`);
  console.log(`   # Terminal 1 - Backend:`);
  console.log(`   cd back-end/app && ${packageManager} run dev\n`);
  console.log(`   # Terminal 2 - Frontend:`);
  console.log(`   cd front-end/my-app && ${packageManager} run dev\n`);

  console.log(`📚 For more info, check the README.md in your project\n`);
  console.log(`🚀 Happy coding!\n`);

  rl.close();
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});
