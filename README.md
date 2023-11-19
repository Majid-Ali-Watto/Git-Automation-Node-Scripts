# Git-Automation-Node-Scripts
​‌‌‍⁡⁣⁢⁢Git commands are enclosed in Node script for pulling and pushing snigle/bulk repo(s)⁡​
This Node.js script interacts with Git repositories based on user input. It includes the following key components:

Imported Modules:

Utilizes 𝗲𝘅𝗲𝗰𝗦𝘆𝗻𝗰 from the 𝗰𝗵𝗶𝗹𝗱_𝗽𝗿𝗼𝗰𝗲𝘀𝘀 module for synchronous execution of shell commands.
Imports prompt-sync for creating a synchronous user input prompt.
Constants and Variables:

Defines an array (UCs) of repository names and branch names (feBranch and masterBranch).
Initializes a variable (repositoryFolder) to store the current repository folder.
User Input Processing:

Prompts the user for input, expecting an action related to Git operations.
Splits the user input into an array to distinguish the action and UC number.
Branch Switching and Git Operations:

Defines functions (⁡⁣⁢⁢𝙨𝙬𝙞𝙩𝙘𝙝𝙋𝙪𝙡𝙡𝙈𝙚𝙧𝙜𝙚 𝙖𝙣𝙙 𝙥𝙪𝙨𝙝𝘾𝙝𝙖𝙣𝙜𝙚𝙨⁡) for switching branches, pulling, merging, staging, committing, and pushing changes in Git.
User Input Handling:

Checks the user input for specific actions ("pull," "push," "pull-all," "push-all") and performs corresponding Git operations.
Looping Through Repositories:

Iterates through an array of repository names (UCs) to perform actions on each repository based on user input.
Error Handling:

Catches errors during Git operations and prints error messages.
Handles scenarios like canceling a commit by undoing changes if the user enters "CANCEL" as the commit message.
𝘛͟𝘩͟𝘪͟𝘴 𝘴͟𝘤͟𝘳͟𝘪͟𝘱͟𝘵 𝘧͟𝘢͟𝘤͟𝘪͟𝘭͟𝘪͟𝘵͟𝘢͟𝘵͟𝘦͟𝘴 𝘎͟𝘪͟𝘵 𝘰͟𝘱͟𝘦͟𝘳͟𝘢͟𝘵͟𝘪͟𝘰͟𝘯͟𝘴 𝘧͟𝘰͟𝘳 𝘪͟𝘯͟𝘥͟𝘪͟𝘷͟𝘪͟𝘥͟𝘶͟𝘢͟𝘭 𝘰͟𝘳 𝘮͟𝘶͟𝘭͟𝘵͟𝘪͟𝘱͟𝘭͟𝘦 𝘳͟𝘦͟𝘱͟𝘰͟𝘴͟𝘪͟𝘵͟𝘰͟𝘳͟𝘪͟𝘦͟𝘴, 𝘢͟𝘭͟𝘭͟𝘰͟𝘸͟𝘪͟𝘯͟𝘨 𝘶͟𝘴͟𝘦͟𝘳͟𝘴 𝘵͟𝘰 𝘱͟𝘶͟𝘭͟𝘭, 𝘱͟𝘶͟𝘴͟𝘩, 𝘰͟𝘳 𝘱͟𝘦͟𝘳͟𝘧͟𝘰͟𝘳͟𝘮 𝘵͟𝘩͟𝘦͟𝘴͟𝘦 𝘢͟𝘤͟𝘵͟𝘪͟𝘰͟𝘯͟𝘴 𝘧͟𝘰͟𝘳 𝘢͟𝘭͟𝘭 𝘳͟𝘦͟𝘱͟𝘰͟𝘴͟𝘪͟𝘵͟𝘰͟𝘳͟𝘪͟𝘦͟𝘴 𝘪͟𝘯 𝘵͟𝘩͟𝘦 𝘢͟𝘳͟𝘳͟𝘢͟𝘺. 𝘐͟𝘵 𝘪͟𝘯͟𝘤͟𝘰͟𝘳͟𝘱͟𝘰͟𝘳͟𝘢͟𝘵͟𝘦͟𝘴 𝘶͟𝘴͟𝘦͟𝘳 𝘪͟𝘯͟𝘱͟𝘶͟𝘵 𝘷͟𝘢͟𝘭͟𝘪͟𝘥͟𝘢͟𝘵͟𝘪͟𝘰͟𝘯 𝘢͟𝘯͟𝘥 𝘦͟𝘳͟𝘳͟𝘰͟𝘳 𝘩͟𝘢͟𝘯͟𝘥͟𝘭͟𝘪͟𝘯͟𝘨 𝘧͟𝘰͟𝘳 ͟𝘢 𝘴͟𝘮͟𝘰͟𝘰͟𝘵͟𝘩͟𝘦͟𝘳 𝘦͟𝘹͟𝘦͟𝘤͟𝘶͟𝘵͟𝘪͟𝘰͟𝘯 𝘰͟𝘧 𝘎͟𝘪͟𝘵 𝘤͟𝘰͟𝘮͟𝘮͟𝘢͟𝘯͟𝘥͟𝘴.
