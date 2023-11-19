/* The line ⁡⁢⁣⁣`𝗶𝗺𝗽𝗼𝗿𝘁 { 𝗲𝘅𝗲𝗰𝗦𝘆𝗻𝗰 } 𝗳𝗿𝗼𝗺 "𝗰𝗵𝗶𝗹𝗱_𝗽𝗿𝗼𝗰𝗲𝘀𝘀";`⁡ is importing the ⁡⁣⁢⁣`𝗲𝘅𝗲𝗰𝗦𝘆𝗻𝗰`⁡ function from the
`child_process` module in Node.js. The `execSync` function is used to ⁡⁣⁢⁣𝗲𝘅𝗲𝗰𝘂𝘁𝗲 𝘀𝗵𝗲𝗹𝗹 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀⁡
synchronously, meaning that it waits for the command to complete before continuing with the
execution of the program. In this code, the `execSync` function is used to run Git commands in the
terminal. */
import { execSync } from "child_process";
import promptSync from "prompt-sync";
/* The line ⁡⁢⁣⁣`𝗰𝗼𝗻𝘀𝘁 𝗽𝗿𝗼𝗺𝗽𝘁 = 𝗽𝗿𝗼𝗺𝗽𝘁𝗦𝘆𝗻𝗰();`⁡ is creating a prompt function that allows the ⁡⁣⁢⁣𝘂𝘀𝗲𝗿 𝘁𝗼 𝗶𝗻𝗽𝘂𝘁⁡
values in the terminal. The `promptSync` function is imported from the "prompt-sync" library, and it
is assigned to the constant variable `prompt`. This function can be used to display a prompt message
and wait for the user to enter a value. */
const prompt = promptSync();
// Array of repositories
const UCs = [
	"crm_oa_brn_uc64_am_fa_mcdf",
	"crm_oa_brn_uc17_ci_sc_cwhte_inq",
	"crm_oa_brn_uc16_ci_sc_cwhte_at",
	"crm_ao_cpu_uc62_fo_cng",
	"crm_oa_brn_uc55_si_au_ap",
	"crm_ao_cpu_uc10_fo_cm_npc_inq",
	"crm_ao_brn_uc24_fo_fa_ci_cei",
	"crm_ao_cpu_uc15_fo_cm_ec_iq",
	"crm_ao_brn_uc23_fo_fa_ci_cnpi",
	"gin_uc14_cifi",
];
// Branches
const feBranch = "fe";
const masterBranch = "master";
let repositoryFolder = "";
// Ask the user for the UC number
const desiredNumber = prompt("You want to :");
/* The line `const ucData = desiredNumber.split(" ");` is splitting the `desiredNumber` string into an
array of substrings using the space character as the delimiter. Each substring will be stored as an
element in the `ucData` array. This allows the code to separate the desired action (e.g., "pull",
"push") from the UC number or "all" keyword. */
const ucData = desiredNumber.split(" ");
/* This code block checks if the second element of the `ucData` array is not a number. If it is not a
number, it checks if it is equal to the string "all". */
/* `parseInt(ucData[1])` is a JavaScript function that converts a string to an integer. In this
code, it is used to check if the second element of the `ucData` array is a number. */
if (!parseInt(ucData[1])) {
	if (ucData[1] == "all")
		/* `ucData[0] += "-all"` is concatenating the string "-all" to the first
	element of the `ucData` array. */
		ucData[0] += "-all";
	else {
		/* This code block is executed when the second element of the `ucData` array is not a number and is
		not equal to the string "all". It logs an error message indicating that the command is not valid
		and prompts the user to type either "pull all" or "push all". After logging the message, it exits
		the process with a status code of 1, indicating an error. */
		console.log(`Not a valid command: ${ucData[1]}\nPlease type "pull/push all"`);
		process.exit(1);
	}
} else {
	/* The code block is iterating over each element in the `UCs` array, which contains a list of
	repository names. It checks if the current repository name includes the second element of the
	`ucData` array (which represents the UC number). */
	for (const repo of UCs) {
		/* The line `if (repo.includes(ucData[1]))` is checking if the current repository name (`repo`)
		includes the second element of the `ucData` array (`ucData[1]`). */
		if (repo.includes(ucData[1])) {
			console.log(`Found matching repository: ${repo}`);
			/* The line `repositoryFolder = repo;` is assigning the value of the `repo` variable to the
			`repositoryFolder` variable. This is done when a matching repository is found for the given UC
			number. The `repositoryFolder` variable is used later in the code to perform actions on the
			specified repository. */
			repositoryFolder = repo;
			break;
		}
	}
	if (!repositoryFolder) {
		console.log(`No matching repository found for UC number: ${desiredNumber}`);
		process.exit(1);
	}
}
// Function to switch branches, pull, and merge
function switchPullMerge(repo) {
	/* The code block enclosed in the `try` statement is responsible for switching branches, pulling
	changes from the remote repository, and merging the changes into the current branch. */
	try {
		/* ⁡⁢⁣⁢`⁡⁢⁣⁢𝗽𝗿𝗼𝗰𝗲𝘀𝘀.𝗰𝗵𝗱𝗶𝗿(`../`);`⁡⁡ is a line of code that changes the current working directory of the
		Node.js process to the specified directory. In this case, it changes the current working directory
		to the parent directory of the repository folder specified by the `repo` variable. This allows the
		subsequent Git commands to be executed in the correct directory, ensuring that the Git operations
		are performed on the correct repository. */
		process.chdir(`../${repo}`);
		execSync(`git stash`);
		execSync(`git checkout ${masterBranch}`);
		execSync(`git pull origin ${masterBranch}`);
		execSync(`git checkout ${feBranch}`);
		execSync(`git merge ${masterBranch}`);
		execSync(`git stash pop`);
		repo = "";
	} catch (error) {
		/* The `catch` block is executed if an error occurs in the `try` block. In this specific case, it is
	catching any errors that occur during the process of switching branches, pulling changes, and
	merging changes. */
		execSync(`git checkout ${feBranch}`);
		execSync(`git stash pop`);
		console.error("Error:", error.message);
		process.exit(1);
	}
}

// Function to push changes to the repository
function pushChanges(repo) {
	try {
		process.chdir(`../${repo}`);
		/* The line `let res = ⁡⁢⁣⁢𝗲𝘅𝗲𝗰𝗦𝘆𝗻𝗰(`𝗴𝗶𝘁 𝘀𝘁𝗮𝘁𝘂𝘀`, { 𝗲𝗻𝗰𝗼𝗱𝗶𝗻𝗴: "𝘂𝘁𝗳𝟴" });`⁡ is executing the command `git
		status` in the terminal and storing the output in the variable `res`.In this case, it is used to get the status of the Git repository, which includes
		information about the current branch, modified files, and other relevant details. The `{ encoding:
		"utf8" }` option specifies that the output should be returned as a UTF-8 encoded string. */
		let res = execSync(`git status`, { encoding: "utf8" });
		console.log("Status before adding: ", res);
		/* The code `res = ⁡⁢⁣⁢𝗲𝘅𝗲𝗰𝗦𝘆𝗻𝗰(`𝗴𝗶𝘁 𝗮𝗱𝗱 .`, { 𝗲𝗻𝗰𝗼𝗱𝗶𝗻𝗴: "𝘂𝘁𝗳𝟴" });`⁡ is executing the command `git add .`
		in the terminal and storing the output in the variable `res`. This command is used to stage all
		changes in the current directory for the next commit. */
		res = execSync(`git add .`, { encoding: "utf8" });
		console.log("Added: ", res);
		res = execSync(`git status`, { encoding: "utf8" });
		console.log("Status after adding: ", res);
		let commitMsg = prompt("Enter commit message OR type CANCEL to exit the process: ");
		/* The line `commitMsg = commitMsg.trim();` is removing any leading or trailing whitespace from the
		`commitMsg` string. This is done using the `trim()` method, which is a built-in JavaScript string
		method. Removing whitespace ensures that the commit message does not contain any unnecessary
		spaces before or after the actual content. */
		commitMsg = commitMsg.trim();
		/* The code block `⁡⁢⁣⁢𝙞𝙛 (𝙘𝙤𝙢𝙢𝙞𝙩𝙈𝙨𝙜 == "𝘾𝘼𝙉𝘾𝙀𝙇")⁡` is checking if the user entered "CANCEL" as the commit
		message. If the condition is true, it executes the command ⁡⁢⁣⁢`𝗴𝗶𝘁 𝗿𝗲𝘀𝗲𝘁 .`⁡ to undo the changes made
		in the local repository and then returns from the function, effectively exiting the process. This
		allows the user to cancel the commit and avoid pushing any changes to the remote repository. */
		if (commitMsg == "CANCEL") {
			execSync(`git reset .`);
			return;
		} /* The line `else if (commitMsg == undefined || commitMsg == "") commitMsg = new
		Date().toString().split("GMT+")[0].trim().replaceAll(" ", "-") + "\n" + res;` is setting a
		default commit message if the user did not provide one or left it empty. */ else if (commitMsg == undefined || commitMsg == "")
			commitMsg = new Date().toString().split("GMT+")[0].trim().replaceAll(" ", "-") + "\n" + res;

		/* The code `res = execSync(`git commit -m ""`, { encoding: "utf8" });` is executing the
		command `git commit -m ""` in the terminal and storing the output in the variable
		`res`. This command is used to commit the changes made in the local repository with a commit
		message specified by the user. */
		res = execSync(`git commit -m "${commitMsg}"`, { encoding: "utf8" });
		console.log(res);
		res = execSync(`git push origin ${feBranch}`, { encoding: "utf8" });
		console.log("Changes pushed successfully.\n", res);
		repo = "";
	} catch (error) {
		/* ⁡⁢⁣⁣‍‍𝕋𝕙𝕖 𝕔𝕠𝕕𝕖 𝕓𝕝𝕠𝕔𝕜 𝕪𝕠𝕦 𝕞𝕖𝕟𝕥𝕚𝕠𝕟𝕖𝕕 𝕚𝕤 𝕦𝕤𝕖𝕕 𝕥𝕠 𝕦𝕟𝕕𝕠 𝕥𝕙𝕖 𝕔𝕙𝕒𝕟𝕘𝕖𝕤 𝕥𝕙𝕒𝕥 𝕨𝕖𝕣𝕖 𝕞𝕒𝕕𝕖 𝕚𝕟 𝕥𝕙𝕖 𝕝𝕠𝕔𝕒𝕝 𝕣𝕖𝕡𝕠𝕤𝕚𝕥𝕠𝕣𝕪 𝕚𝕗
		𝕒𝕟 𝕖𝕣𝕣𝕠𝕣 𝕠𝕔𝕔𝕦𝕣𝕤 𝕨𝕙𝕚𝕝𝕖 𝕡𝕦𝕤𝕙𝕚𝕟𝕘 𝕔𝕙𝕒𝕟𝕘𝕖𝕤 𝕥𝕠 𝕥𝕙𝕖 𝕣𝕖𝕞𝕠𝕥𝕖 𝕣𝕖𝕡𝕠𝕤𝕚𝕥𝕠𝕣𝕪.⁡ */
		/* `⁡⁢⁣⁢𝗴𝗶𝘁 𝗿𝗲𝘀𝗲𝘁 .`⁡ is a Git command that is used to unstage changes in the
		current directory. It removes all changes that have been added to the
		staging area (index) but keeps the changes in the working directory. This
		command allows you to undo the `git add` command and prevent the changes
		from being included in the next commit. */
		let reversed = execSync(`git reset .`, { encoding: "utf8" });
		console.log("Changes not added.\n", reversed);
		/* ⁡⁢⁣⁢`𝗴𝗶𝘁 𝗿𝗲𝘀𝗲𝘁 𝗛𝗘𝗔𝗗^`⁡ is a Git command that is used to undo the last commit. */
		reversed = execSync(`git reset HEAD^`, { encoding: "utf8" });
		console.log("Changes not added.\n", reversed);
		console.error("Error pushing changes:", error.message);
		process.exit(1);
	}
}

/* ⁡⁢⁣⁣𝕋𝕙𝕖 `𝕤𝕨𝕚𝕥𝕔𝕙` 𝕤𝕥𝕒𝕥𝕖𝕞𝕖𝕟𝕥 𝕚𝕤 𝕦𝕤𝕖𝕕 𝕥𝕠 𝕡𝕖𝕣𝕗𝕠𝕣𝕞 𝕕𝕚𝕗𝕗𝕖𝕣𝕖𝕟𝕥 𝕒𝕔𝕥𝕚𝕠𝕟𝕤 𝕓𝕒𝕤𝕖𝕕 𝕠𝕟 𝕥𝕙𝕖 𝕧𝕒𝕝𝕦𝕖 𝕠𝕗 `𝕦𝕔𝔻𝕒𝕥𝕒[𝟘]`, 𝕨𝕙𝕚𝕔𝕙
𝕣𝕖𝕡𝕣𝕖𝕤𝕖𝕟𝕥𝕤 𝕥𝕙𝕖 𝕕𝕖𝕤𝕚𝕣𝕖𝕕 𝕒𝕔𝕥𝕚𝕠𝕟 (𝕖.𝕘., "𝕡𝕦𝕝𝕝", "𝕡𝕦𝕤𝕙", "𝕡𝕦𝕝𝕝-𝕒𝕝𝕝", "𝕡𝕦𝕤𝕙-𝕒𝕝𝕝").⁡ */
/* `ucData[0]` is accessing the first element of the `ucData` array. It represents the desired
action (e.g., "pull", "push", "pull-all", "push-all") that the user wants to perform. */
switch (ucData[0]) {
	case "pull":
		switchPullMerge(repositoryFolder);
		break;
	case "push":
		pushChanges(repositoryFolder);
		break;
	case "pull-all": {
		// pull each repository one by one
		for (let index = 0; index < UCs.length; index++) switchPullMerge(UCs[index]);
		break;
	}
	case "push-all": {
		// push each repository one by one
		for (let index = 0; index < UCs.length; index++) pushChanges(UCs[index]);
		break;
	}
	default:
		console.log("Invalid option. Exiting.");
		break;
}
