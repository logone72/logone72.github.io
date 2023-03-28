
싱글톤이란 **객체의 인스턴스가 오직 1개만 생성**되는 패턴을 의미한다.

## 사용 예시

```js
class Singleton {
	static instance = new Singleton();
	
	static getInstance() {
		return Singleton.instance;
	}
	
	constructor() {
		this.message = "hello, world";
	} 
	
	speak() {
		console.log(this.message);
	} 
	
	setMessage(message) {
		this.message = message;
	}
}
```