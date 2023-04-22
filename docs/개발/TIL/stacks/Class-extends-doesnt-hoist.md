
class 작업 중 아래와 같은 오류를 만났다. 

> Uncaught TypeError: Super expression must either be null or a function, not undefined


위 오류는 아래와 같은 경우에서 발생한다.

_상속 받으려는 상위 클래스가 존재하지 않는 경우_ [출처](https://stackoverflow.com/questions/30116430/reactjs-giving-error-uncaught-typeerror-super-expression-must-either-be-null-or)

```markdown
This means that you want subclass something, which should be `Class`, but is `undefined`. The reasons might be:

-   typo in `Class extends ...`, so you extending undefined variable
-   typo in `import ... from`, so you import `undefined` from module
-   referenced module does not contain the value, you want import (e.g. obsolete module - case with React), so you importing non existing value (`undefined`)
-   typo in referenced module `export ...` statement, so it exports undefined variable
-   referenced module missing `export` statement at all, so it exports just `undefined`
```

> 추가적으로 순환 참조에 의해 발생하기도 한다 [출처](https://velog.io/@ooooorobo/Uncaught-TypeError-Super-expression-must-either-be-null-or-a-function)


나의 경우, 상속받으려는 상위 클래스가 상속을 받는 하위 클래스보다 아래 선언 되어 있어서, 호이스팅으로 선언은 되어있었지만, 초기화 되어있지 않아서 발생했다.