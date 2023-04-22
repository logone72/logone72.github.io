

## 이슈

### workflow 에러

```
Error: The process '/usr/bin/git' failed with exit code 128
```

> I had the same issue after creating another template from a working project. To fix it I had to change Workflow permission through Repo -> Settings -> Actions -> General Set: Read and write permissions Check: Allow Github Actions to create and approve pull requests

perfectly solve my problem