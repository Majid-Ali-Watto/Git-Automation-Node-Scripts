# Git-Automation-Node-Scripts
Git commands are enclosed in Node script for pulling and pushing snigle/bulk repo(s)
This Node.js script interacts with Git repositories based on user input. It includes the following key components:

Imported Modules:

Utilizes execSync from the child_process module for synchronous execution of shell commands.
Imports prompt-sync for creating a synchronous user input prompt.
Constants and Variables:

Defines an array (UCs) of repository names and branch names (feBranch and masterBranch).
Initializes a variable (repositoryFolder) to store the current repository folder.
User Input Processing:

Prompts the user for input, expecting an action related to Git operations.
Splits the user input into an array to distinguish the action and UC number.
Branch Switching and Git Operations:

Defines functions (switchPullMerge and pushChanges) for switching branches, pulling, merging, staging, committing, and pushing changes in Git.
User Input Handling:

Checks the user input for specific actions ("pull," "push," "pull-all," "push-all") and performs corresponding Git operations.
Looping Through Repositories:

Iterates through an array of repository names (UCs) to perform actions on each repository based on user input.
Error Handling:

Catches errors during Git operations and prints error messages.
Handles scenarios like canceling a commit by undoing changes if the user enters "CANCEL" as the commit message.
This script facilitates Git operations for individual or multiple repositories, allowing users to pull, push, or perform these actions for all repositories in the array. It incorporates user input validation and error handling for a smoother execution of Git commands.
