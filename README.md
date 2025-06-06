# Description

Minimal reproduction of an issue with `AP.jira.refreshIssuePage()` to support [ECOHELP-68604](https://ecosystem.atlassian.net/servicedesk/customer/portal/34/ECOHELP-68604)

# Setup

```
git clone https://github.com/scottohara/ecohelp-68604-jira-refresh-issue-bug.git
cd ecohelp-68604-jira-refresh-bug
npm install
cp .env.example .env
cp credentials.example.json credentials.json
```

Edit the `.env` file and put in your ngrok auth token.

Edit the `config.json` file and put in your JIRA cloud instance, username & password.

Run `npm start` to start the app and it should automatically register in the above JIRA cloud instance.

# Reproduction steps

1. Create an issue in JIRA.
2. From the "..." menu at the top right, observe that there is an action menu item labelled "Add ECOHELP-68604".
3. Select this action and a confirmation dialog will appear.
4. Click the dialog Submit button. (At this point, an entity property is written to with `{ show: true }`, and `AP.jira.refreshIssuePage()` is called - see [add-dialog.js](./public/add-dialog.js))

# Expected result:

- The webitem for "Add ECOHELP-68604" has a condition that it only appears if the entity property does not contain `{ show: true }`. When `AP.jira.refreshIssuePage()` is called, this should mean that the webitem is hidden.
- The webitem for "Delete ECOHELP-68604" has a condition that it only appears if the entity property contains `{ show: true }`. When `AP.jira.refreshIssuePage()` is called, this should mean that the webitem is visible.

The above expectations were how JIRA behaved for many years until very recently.

If you manually reload the page, the correct webitems are displayed as per the conditions.

# Actual result:

- The webitem for "Add ECOHELP-68604" remains visible after its conditions are no longer satisfied and `AP.jira.refreshIssuePage()` is called.
- The webitem for "Delete ECOHELP-68604" remains hidden after its conditions are not longer satisfied and `AP.jira.refreshIssuePage()` is called.

If you manually reload the page, the correct webitems are displayed as per the conditions.
