AP.context.getContext((context) => {
  const issueKey = context.jira.issue.key,
    url = `/rest/api/2/issue/${issueKey}/properties/ecohelp-68604`;

  AP.dialog.getButton("submit").bind(() => {
    AP.request({
      url,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify({
        show: true,
        value: "Now select 'Delete ECOHELP-68604' from the '...' menu.",
      }),
    }).then(() => {
      AP.jira.refreshIssuePage();
      AP.dialog.close();
    });
  });
});
