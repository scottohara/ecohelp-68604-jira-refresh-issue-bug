AP.context.getContext((context) => {
  const issueKey = context.jira.issue.key,
    restUrl = `/rest/api/2/issue/${issueKey}/properties/ecohelp-68604`;

  AP.request(restUrl, { contentType: "application/json" })
    .then((response) => {
      const { value } = JSON.parse(response.body).value;
      document.body.innerText = value;
    })
    .catch(() => {
      document.body.innerText =
        "Select 'Add ECOHELP-68604' from the '...' menu to get started.";
    });
});
