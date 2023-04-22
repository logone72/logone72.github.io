

### dry run (머지, 커밋하기 전에 컨플릭 미리보기)

As noted previously, 
pass in the `--no-commit` flag, but to avoid a fast-forward commit, 
also pass in `--no-ff`, like so:

```
$ git merge --no-commit --no-ff $BRANCH
```

To examine the staged changes:

```
$ git diff --cached
```

And you can undo the merge, even if it is a fast-forward merge:

```
$ git merge --abort
```


### destination (어디서 어디로?)

```
git rebase (target)(current branch)
```

Assume the following history exists and the ==current branch is "topic":==

```
          A---B---C topic
         /
    D---E---F---G master
```

From this point, the result of either of the following commands:

```
git rebase master
git rebase master topic
```

would be:

```
                  A'--B'--C' topic
                 /
    D---E---F---G master
```