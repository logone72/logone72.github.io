

```js
const regex = /e/g;
regex.test('e'); // true
regex.test('e'); // false
>>> wow!
```

버그 픽스 작업을 하는 도중 매우 기이한 현상을 발견하게 되었다. __동일한 input을 넣었는데 다른 output이 나온다니??__

위와 같은 일반적이지 않은 __현상의 원인는 바로 `g` 플래그__였다.

>g 플래그란? 
>	g flag는 "전역(global)" 플래그를 나타냅니다. 이 플래그는 정규 표현식에서 일치하는 모든 문자열을 대상으로 검색을 계속하도록 지시합니다. 일치하는 첫 번째 문자열을 찾은 후에도 검색을 중단하지 않고 계속해서 다음 일치하는 문자열을 찾습니다.

`String.prototype.match()`에서는 정규 표현식에 g 플래그가 주어지면, 패턴과 일치하는 모든 것을 담은 배열을 반환한다.

이와 같은 동작이 `RegExp.prototype.test()` 혹은 `exec()`에도 적용되는데, `test()`와 `exec()` 메소드는 내부적으로  `RegExp: lastIndex` 부터 주어진 문자열을 검사한다. 

기본적으로 0으로 설정되어있는데, `g` 플래그(혹은 `y` 플래그)가 주어진 경우 값이 자동적으로 변동될 수 있게 된다.

`test()`와 `exec()` 메소드가 수행되면서 패턴을 충족하는 `match`를 찾을 때, 해당 문자열 다음 `index`로 `lastIndex`가 변경된다.

만약 `test()`와 `exec()` 가 `match`를 찾지 못한 경우, 다시 0로 세팅된다. 

```js
const regex = /e/g;
regex.lastIndex  // 0
regex.test('e'); // true
regex.lastIndex  // 1
regex.test('e'); // false
regex.lastIndex  // 0
regex.test('e'); // true
```

동일한 `RegExp`를 참조하여 `test()` 를 진행하는 경우에 발생할 수 있고, 직관적이지 않은 동작 원리이기에 인지하지 못한다면 나처럼... 원인을 찾는데 고생 할 수도 있다.



### 출처

https://stackoverflow.com/questions/28910934/why-does-regex-test-changes-the-result-in-subsequent-calls
https://stackoverflow.com/questions/1520800/why-does-a-regexp-with-global-flag-give-wrong-results
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex