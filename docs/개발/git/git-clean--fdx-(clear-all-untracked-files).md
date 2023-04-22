
git 은 기본적으로 우리가 원하는 파일들을 추적(track)당하게끔 commit을 해서 버젼관리를 하게 합니다.

하지만 로컬에 여러가지 이유로 추적되지 않은(untracked) 파일 혹은 디렉토리들이 생기는 경우가 있습니다. (bracnh 이동 등...)

이를 한번에 정리하려면 아래의 명령어를 사용하면됩니다.

```
git clean -fd
```

`-f`  강제로 파일들을 삭제합니다
`-d` -디렉토리 또한 포함합니다.

*추가옵션:*
`-x`  .gitignore에 명시된 무시할 파일들을 삭제할지 여부입니다.

[git clean](https://git-scm.com/docs/git-clean)
[출처/stackoverflow](https://stackoverflow.com/questions/8200622/how-to-remove-untracked-files-in-git)