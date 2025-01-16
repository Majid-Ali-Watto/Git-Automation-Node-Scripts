
import { execSync } from "child_process";
// import promptSync from "prompt-sync";
// const prompt = promptSync();
// const desiredNumber = prompt("You want to :");
//https://github.com/Majid-Ali-Watto/Git-Automation-Node-Scripts.git


// Branches
const feBranch = "fe";
const masterBranch = "master";
let stashMsg = undefined;

// Function to switch branches, pull, and merge
export function switchPullMerge(repo) {
	let message = ''
	try {
		process.chdir(`${process.env.BASE_URL}/CRM_UseCases/${repo}`);
		stashMsg = execSync(`git stash`, { encoding: "utf8" });
		console.log(stashMsg);
		message += stashMsg
		message += execSync(`git checkout ${masterBranch}`);
		let res = execSync(`git pull origin ${masterBranch}`, { encoding: "utf8" });
		console.log(res);
		message += res
		message += execSync(`git checkout ${feBranch}`);
		res = execSync(`git merge ${masterBranch}`, { encoding: "utf8" });
		console.log(res);
		message += res
		if (stashMsg.includes("Saved working directory and index state")) {
			res = execSync(`git stash pop`, { encoding: "utf8" });
			console.log(res);
			message += res
		}

	} catch (error) {
		execSync(`git checkout ${feBranch}`);
		if (stashMsg.includes("Saved working directory and index state")) execSync(`git stash pop`);
		console.error("Error:", error.message);
		message += error.message;
	}
	return message;
}

// Function to push changes to the repository
export function pushChanges(repo, commitMsg) {
	try {
		let msg=''
		process.chdir(`${process.env.BASE_URL}/CRM_UseCases/${repo}`);
		let res = execSync(`git status`, { encoding: "utf8" });
		msg +=res
		console.log("Status before adding: ", res);
		res = execSync(`git add .`, { encoding: "utf8" });
		console.log("Added: ", res);
		msg += res
		res = execSync(`git status`, { encoding: "utf8" });
		console.log("Status after adding: ", res);
		msg += res
		// let commitMsg = prompt("Enter commit message OR type CANCEL to exit the process: ");
		// commitMsg = commitMsg.trim();
		// if (commitMsg == "CANCEL") {
		// 	execSync(`git reset .`);
		// 	return;
		// } else if (commitMsg == undefined || commitMsg == "")
		// 	commitMsg = new Date().toString().split("GMT+")[0].trim().replaceAll(" ", "-") + "\n" + res;

		res = execSync(`git commit -m "${commitMsg}"`, { encoding: "utf8" });
		console.log(res);
		msg += res
		res = execSync(`git push origin ${feBranch}`, { encoding: "utf8" });
		console.log("Changes pushed successfully.\n", res);
		msg += res
		return msg;
	} catch (error) {
		/* ⁡⁢⁣⁣‍‍𝕋𝕙𝕖 𝕔𝕠𝕕𝕖 𝕓𝕝𝕠𝕔𝕜 𝕪𝕠𝕦 𝕞𝕖𝕟𝕥𝕚𝕠𝕟𝕖𝕕 𝕚𝕤 𝕦𝕤𝕖𝕕 𝕥𝕠 𝕦𝕟𝕕𝕠 𝕥𝕙𝕖 𝕔𝕙𝕒𝕟𝕘𝕖𝕤 𝕥𝕙𝕒𝕥 𝕨𝕖𝕣𝕖 𝕞𝕒𝕕𝕖 𝕚𝕟 𝕥𝕙𝕖 𝕝𝕠𝕔𝕒𝕝 𝕣𝕖𝕡𝕠𝕤𝕚𝕥𝕠𝕣𝕪 𝕚𝕗
		𝕒𝕟 𝕖𝕣𝕣𝕠𝕣 𝕠𝕔𝕔𝕦𝕣𝕤 𝕨𝕙𝕚𝕝𝕖 𝕡𝕦𝕤𝕙𝕚𝕟𝕘 𝕔𝕙𝕒𝕟𝕘𝕖𝕤 𝕥𝕠 𝕥𝕙𝕖 𝕣𝕖𝕞𝕠𝕥𝕖 𝕣𝕖𝕡𝕠𝕤𝕚𝕥𝕠𝕣𝕪.⁡ */
		/* `⁡⁢⁣⁢𝗴𝗶𝘁 𝗿𝗲𝘀𝗲𝘁 .`⁡ is a Git command that is used to unstage changes in the
		current directory. It removes all changes that have been added to the
		staging area (index) but keeps the changes in the working directory. This
		command allows you to undo the `git add` command and prevent the changes
		from being included in the next commit. */
		let msg = ''
		let reversed = execSync(`git reset .`, { encoding: "utf8" });
		console.log("Changes not added.\n", reversed);
		msg+=reversed
		/* ⁡⁢⁣⁢`𝗴𝗶𝘁 𝗿𝗲𝘀𝗲𝘁 𝗛𝗘𝗔𝗗^`⁡ is a Git command that is used to undo the last commit. */
		reversed = execSync(`git reset HEAD^`, { encoding: "utf8" });
		console.log("Changes not added.\n", reversed);
		msg += reversed
		console.error("Error pushing changes:", error.message);
		msg += error.message
		return msg;
	}
}

// Function to Open VS Code of the repository
export function OpenVsCode(repo) {
	try {
		if (Number(repo)) {
			try {
				process.chdir(`${process.env.BASE_URL}/megaset-monorepo/packages/megaset${repo}`);
				execSync(`git checkout packaged`, { encoding: "utf8" });
				execSync(`git pull`, { encoding: "utf8" });
			} catch (error) {
				process.chdir(`${process.env.BASE_URL}/megaset-monorepo/packages/`);
				execSync(`git clone ${process.env.MEGAS_URL}/megaset${repo}.git`, { encoding: "utf8" });
				process.chdir(`${process.env.BASE_URL}/megaset-monorepo/packages/megaset${repo}`);
				execSync(`git checkout packaged`, { encoding: "utf8" });
			}
		}
		else process.chdir(`${process.env.BASE_URL}/CRM_UseCases/${repo}`);
		execSync(`code .`, { encoding: "utf8" });
		return true;
	} catch (error) {
		return false
	}
}

