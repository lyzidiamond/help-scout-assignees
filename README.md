# help-scout-assignees

Get a list of how many Help Scout conversations are assigned to each person in order.

## How to use this tool

1. Install by running:

    `$ npm install -g help-scout-assignees`

2. Log in to your Help Scout account.
3. Navigate to Your Profile (top right corner), click API Keys, and generate a new API key. Copy it.
4. Add the API key as an environment variable in your console:

    ```
    $ echo 'export HelpScoutKey=[paste API key]' >> ~/.bash_profile
    $ source ~/.bash_profile
    ```

6. In Help Scout, go to **Manage > Mailboxes** and click on your desired mailbox. The URL should look like `https://secure.helpscout.net/settings/mailbox/[number]/`. Copy the number.
7. Run the script:

    `$ help-scout-assignees [paste number]`

## To do

- [ ] create a slackbot so you can pipe these results directly into Slack
- [ ] allow user to mention mailbox by name instead of IDs
- [x] make a node module
