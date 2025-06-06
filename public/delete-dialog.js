AP.context.getContext((context) => {
  const issueKey = context.jira.issue.key,
    url = `/rest/api/2/issue/${issueKey}/properties/ecohelp-68604`;

  AP.dialog.getButton("submit").bind(() => {
    AP.request({ url, type: "DELETE" }).then(() => {
      AP.jira.refreshIssuePage();
      AP.dialog.close();
    });
  });
});
