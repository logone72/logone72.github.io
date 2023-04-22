

local branch 중 더이상 remote에 존재하지 않는 branch를 삭제하는 명령어입니다.

편리하게 작업이 완료된 local branch들을 한번에 삭제하여 branch list를 깔끔하게 정리할 수 있습니다. 

```
git fetch -p && for branch in $(git for-each-ref --format '%(refname) %(upstream:track)' refs/heads | awk '$2 == "[gone]" {sub("refs/heads/", "", $1); print $1}'); do git branch -D $branch; done
```

자세한 내용은 아래와 같습니다.

# 원문
[링크](https://stackoverflow.com/posts/33548037/timeline)

The safest way to do this is to use the "plumbing" command `git for-each-ref` with the interpolation variable `%(upstream:track)`, which will be `[gone]` when the branch is no longer on the remote:

```
git fetch -p && for branch in $(git for-each-ref --format '%(refname) %(upstream:track)' refs/heads | awk '$2 == "[gone]" {sub("refs/heads/", "", $1); print $1}'); do git branch -D $branch; done
```

This approach is somewhat safer than using the "porcelain" command, because there is no risk of accidentally matching on part of the commit message. Here is a version using the "porcelain" git commands:

```
git fetch -p && for branch in $(git branch -vv | grep ': gone]' | awk '{print $1}'); do git branch -D $branch; done
```

The way this works is that after the command

```
git fetch -p
```

removes the remote references, when you run

```
git branch -vv
```

it will show 'gone' as the remote status. For example,

```
$ git branch -vv
  master                 b900de9 [origin/master: behind 4] Fixed bug
  release/v3.8           fdd2f4e [origin/release/v3.8: behind 2] Fixed bug
  release/v3.9           0d680d0 [origin/release/v3.9: behind 2] Updated comments
  bug/1234               57379e4 [origin/bug/1234: gone] Fixed bug
```

This is what the scripts iterate over.