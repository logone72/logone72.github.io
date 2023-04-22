
# 개요

코드 작성시, 관심사 분리가 되도록 MVC 아키텍쳐를 조사

### 링크

[Tania Rascia의 JS MVC 패턴 적용 - 설명](https://www.taniarascia.com/javascript-mvc-todo-app/)
[Tania Rascia의 JS MVC 패턴 적용 - 예시](https://github.com/taniarascia/mvc/blob/master/script.js)

https://alistapart.com/article/javascript-mvc/

# MVC

## 시작

```js
class Model {
  constructor() {}
}

class View {
  constructor() {}
}

class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view
  }
}

const app = new Controller(new Model(), new View())
```


## Controller

### 시작
1. model, view class 생성
2.  handler 등록 - view binder
3. callback 등록 - model binder
4. document ready 시 초기화 실행. (init)

### 역할
1. modal 과 view 연결

>The controller is the __link__ between the __model__ (the data ) and the __view__ (what the user sees).



## Model

### 역할
1. 데이터 관리
2. 서버 통신
	1. controller가 서버 응답 후 callback 등록할 수 있게 해주는 binder

> It doesn't involve any events or DOM manipulation. It's just __storing__ and __modifying data.__

## View

### 역할
1. UI
2. event listener
	1. controller 가 handler 등록할 수 있도록 해주는 binder

> Neither the controller nor the model should know anything about the DOM, HTML elements, CSS, or any of that. __Anything relating to it should be in the view__.

pug 파일에 이미 작성된 내용은 일종의 View init에 포함된 내용



# 케이스 고민

## 신규 페이지 생성시 기본적으로 들어가는 요소들

view, page 분리
1. PC, mobile에 따라 page에서 처리
2. view는 공통

checkWebPage

initLoginModule


https://stackoverflow.com/questions/43431550/async-await-class-constructor