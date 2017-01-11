# help-scout-assignees

Get a list of how many Help Scout conversations are assigned to each person in order.

## How to use this tool

1. Clone this repo to your local machine and, using the command line, navigate to it.
2. Log in to your Help Scout account.
3. Navigate to Your Profile (top right corner), click API Keys, and generate a new API key. Copy it.
4. Add the API key as an environment variable in your console:

    `export HelpScoutKey=[paste API key]`

5. Install dependencies:

    `npm install`

6. In Help Scout, go to **Manage > Mailboxes** and click on your desired mailbox. The URL should look like `https://secure.helpscout.net/settings/mailbox/[number]/`. Copy the number.
7. Run the script:

    `node index.js [paste number]`
