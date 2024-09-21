# javascript의 알면 뻔하지만 몰랐을 수도 있는 동작

![](https://velog.velcdn.com/images/mayo3610/post/2a3d6e54-562b-4775-979b-e4abf4301282/image.jpeg)


javascript는 우리에게 익숙한 언어지만, 그 속에는 알아두면 유용하지만 쉽게 간과할 수 있는 동작들이 숨어 있다. 어떤 것들은 너무 당연하게 느껴져서 별다른 고민 없이 지나치기도 하고, 또 다른 것들은 특정 상황에서만 드러나기 때문에 한 번도 문제를 겪지 않았다면 알기 어려울 수도 있다. 이번 글에서는 **알면 뻔하지만 몰랐다면 계속 모를 수도 있는 자바스크립트의 동작**들을 살펴보려고 한다.


## 배열에 비교 연산자를 사용하면 어떻게 될까

![](https://www.javascripttutorial.net/wp-content/uploads/2016/11/JavaScript-Comparison-Operators.png)

개발 중 실수로 배열인지 모른 채 배열에 대소비교 연산자(`>`, `<`)를 적용한 적이 있었다. 단순한 테스트 케이스에서는 정상적으로 작동하는 것처럼 보였기 때문에 문제를 인지하지 못했지만, 이후 배열의 요소가 변하면서 문제가 발생했고, 그제야 오류를 발견할 수 있었다.

왜 처음에는 문제가 보이지 않았을까?

결론부터 말하자면, **배열에 비교 연산자가 적용되면 배열이 문자열로 변환되어 비교가 이루어지기 때문**이다.


### 상세

javascript 의 비교 연산자(`>`, `<`, `>=`, `<=`)는 숫자뿐만 아니라 다른 값들을 비교하는 데도 사용할 수 있다. 만약 비교 연산자의 피연산자 중 하나가 객체라면, javascript 는 이를 원시 값으로 변환하려고 시도하는데, 이때 비교연산자의 경우 **숫자 우선 변환 알고리즘(prefer-number algorithm)**이 적용된다.

숫자 우선 변환 알고리즘은 먼저 객체의 `.valueOf()` 메서드를 호출한다. 만약 반환된 값이 원시 값(숫자, 문자열 등)이면 그 값이 사용된다. 그러나 대부분의 경우 배열의 `.valueOf()` 메서드는 배열 객체 자체를 반환한다. 이 경우, 자바스크립트는 자동으로 `.toString()` 메서드를 호출하여 배열을 문자열로 변환한다.

결과적으로, **배열이 비교 연산자의 피연산자로 사용될 경우 `.valueOf()` 메서드가 먼저 호출되고, `.toString()` 메서드가 호출되어 배열이 문자열로 변환**된다.


### 예시

예를 들어 `[1] > [2]`를 비교할 때는 `'1' > '2'`를 비교하는 것과 같고, `[1,2] > [1,1]`을 비교할 때는 `'1,2' > '1,1'`를 비교하는 것이 된다.

javascript 에서 문자열은 유니코드 코드 포인트를 기준으로 비교되기 때문에:

- `'1' > '2'`는 `false`로 평가된다.
- `'1,2' > '1,1'`는 `true`로 평가된다.

이처럼 배열을 비교할 때 문제가 발생하는 이유는 배열이 자동으로 문자열로 변환되기 때문이다. 배열을 비교할 때는 이러한 변환 과정을 염두에 두고, 정확한 비교를 위해 배열의 각 요소를 명시적으로 처리하는 것이 중요하다.


## finally vs return

`return`은 **함수의 실행을 종료**하고, 주어진 값을 함수 호출 지점으로 반환한다. 반면, `finally` 블록은 코드의 제어 흐름 상 **반드시 실행**된다.

그렇다면, `finally`와 `return`이 동시에 사용되면 어떤 일이 벌어질까?

```js
const a = () => {
	try {
		return;
	} finally {
		console.log('finally');
	}
}
```

**`finally` 블록이 먼저 실행**된 후, `return`이 수행된다.

즉, `finally`가 이겼다!

이 동작은 javascript 의 명세에 정의된 것이기 때문에 특별한 설명이 더 필요하지 않다. 대신, 아래 예시를 통해 `finally`의 강력함을 직접 확인해보자.

```js
const a = () => {
	try {
		return 'a';
	} finally {
		return 'b';
	}
}

console.log(a());
>>> b
```

```js
const a = () => {
	try {
		return 'a';
	} finally {
		console.log('b');
	}
}

console.log(a());
>>> b
>>> a
```


## x !== x 가 true 인 경우가 있다?

javascript 에는 값이 일치하는지 확인하기 위한 두 가지 비교 연산자가 있다.

1. `==` 동등 비교 연산자
2. `===` 일치 비교 연산자

`==` 동등 비교 연산자는 타입을 자동으로 변환한 후 값을 비교하고, `===` 일치 비교 연산자는 타입과 값을 모두 엄격하게 비교한다. 그런데 `x !== x`가 true라니, 이게 가능한 일일까?

javascript 에서 원시 타입과 객체 타입을 생각해봐도 이런 경우가 존재하기 어려워 보인다. 하지만 정답은 다음과 같다.


```js
NaN !== NaN // true
```


이는 javascript `number` 타입이 [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754)라고 하는 컴퓨터에서 부동소수점을 표현하는 표준을 따르는 배정밀도 64비트 이진 부동소수점 형식 *(double-precision 64-bit binary floating-point format)* 를 값으로 가지기 때문이다.

> [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754)에서는 ±0, 무한대, 그리고 `NaN`(Not a Number) 등의 기호를 정의하고, 이 수들에 대한 연산 방식을 규정하고 있다.


![](https://dandkim.com/static/8da4668def0c4ccef925da76031f29b1/4b190/confused3.jpg)

특히, `NaN`은 수학적으로 정의되지 않는 연산(예: 0을 0으로 나눈 경우)에 대한 결과로, 컴퓨팅 시스템에서 사용된다. 이에 따라 javascript에서는 `NaN`과 관련된 비교 규칙이 다음과 같이 정의된다.

|NaN ≥ _x_|NaN ≤ _x_|NaN > _x_|NaN < _x_|NaN = _x_|NaN ≠ _x_|
|---|---|---|---|---|---|
|False|False|False|False|False|True|

즉, `NaN`은 어떤 값과 비교해도 항상 `false`를 반환하므로, `NaN !== NaN` 역시 `true`가 된다. 따라서, javascript에서 `x !== x`가 `true`로 평가되는 특별한 경우는 바로 `NaN`일 때이다. 이로 인해 `x !== x`가 true인 흥미로운 결과를 얻게 된다.


마지막으로, `NaN`을 `NaN`과 일치하는지 비교를 할 때 `true` 가 반환되는 방법을 소개한다.

```js
Object.is(NaN, NaN) // true
```

`Object.is()`가 `==` , `===` 와 다른 점 중 하나이다. `Object.is()`는 `==`처럼 여러 강제가 있지도 않고,  `===`와 다르게 `NaN` 을 동일하게 비교한다.


## 자료 출처


https://stackoverflow.com/questions/62717437/behavior-of-greater-than-and-another-inequality-comparison-operators-on-arra
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch#the_finally_block
https://en.wikipedia.org/wiki/NaN
https://en.wikipedia.org/wiki/IEEE_754
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/is