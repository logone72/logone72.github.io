## 참고  URL

https://dev.to/denisveleaev/5-solid-principles-with-javascript-how-to-make-your-code-solid-1kl5
https://medium.com/front-end-weekly/s-o-l-i-d-principles-with-js-examples-db95b44e82e

* SRP (**Single Responsiblity Principle**, 단일 책임 원칙)
* OCP (**Open-Closed Principle**, 개방-폐쇄 원칙)
- LSP (**Liskov Substitution Principle**, 리스코프 치환 원칙)
- DIP (**Dependency Inversion Principle**, 의존 역전 원칙)
- ISP (**Interface Segregation Principle**, 인터페이스 분리 원칙)


!

## Single Responsiblity Principle, 단일 책임 원칙

>**- 소프트웨어의 설계 부품(클래스, 함수 등)은 단 하나의 책임만을 가져야 한다.**


### BAD

User 클래스는 현재 두가지 책임을 지고 있습니다.

- 유저의 정보를 변경
- 유저 정보 변경을 로깅

```js
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.logs = [];
  }

  setName(name) {
    this.name = name;
    this.logs.push("Edited user name");
  }

  setAge(age) {
    this.age = age;
    this.logs.push("Edited user age");
  }
}
```




	This generates problems in maintaining stability; 
	once we have more than one reason to change this class, let’s suppose that we need to implement a better Log control with date and time; when we add this, we could break things that are not directly with Log like edit user name or age, also, this will become this class bigger than it needs to be.


### GOOD

Proxy 패턴을 적용해서 단일 책임 원칙을 위배하지 않는 두 클래스를 만들어보자.

이제 우리는 두가지 책임을 각각 담당할 두가지 클래스가 있습니다.

- **User Class:** 유저의 정보만 다룸 (변경,저장)
- **UserLogProxy Class:** 유저 클래스의 변경만 다룸

```js
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  setName(name) {
    this.name = name;
  }

  setAge(age) {
    this.age = age;
  }
}

class UserLogProxy {
  constructor() {
    this.logs = [];
  }

  get(target, propKey, receiver) {
    const UserLogScope = this;

    if (propKey === "logs") {
      return {
        get: () => this.getLogs(),
      };
    }

    const targetValue = Reflect.get(target, propKey, receiver);

    if (typeof targetValue === "function") {
      return function(...args) {
        UserLogScope.add(`Edited user ${propKey.replace("set", "")}`);

        return targetValue.bind(this, args);
      };
    } else {
      return targetValue;
    }
  }

  getLogs() {
    return this.logs;
  }

  add(message) {
    this.logs.push(message);
  }
}

const run = () => {
  const UserInstanceWithLogs = new Proxy(
    new User("Ricardo", 32),
    new UserLogProxy(),
  );

  UserInstanceWithLogs.setAge(33);
  UserInstanceWithLogs.setName("Ricardo Luz");
  console.log(UserInstanceWithLogs.logs.get());
};

run();
```



## Open-Closed Principle, 개방-폐쇄 원칙

>**- 기존의 코드를 변경하지 않고(Closed) 기능을 수정하거나 추가할 수 있도록(Open) 설계해야 한다.**

코딩에서 유일한 진리가 하나 있는데, 바로 **C H A N G E S** 다.

우리가 작성한 모든 코드는, 반드시 ==변경== 되야 하는 시점을 맞이한다.

**The way that we change our code will define the code quality**, if we constantly change our current classes, this will generate bugs in our code, but if we extend our classes with new ones this will help us to avoid bugs in our code, that’s the main idea of **OCP Principle**.


### BAD 


```js
class Sandwich {
  constructor({ name, size, price } = {}) {
    this.setName(name);
    this.setSize(size);
    this.setPrice(price);
  }

  setName(name) {
    this.name = name;
  }

  setPrice(price) {
    this.price = price;
  }

  setSize(size) {
    const sizesList = ["small", "medium", "big"];
    if (sizesList.contais(size)) {
      this.size = size;
    }
  }
}
```


### GOOD

```js
class Sizes {
	constructor() {
		this.data = ["small", "medium", "big"];
		return this.data;
	}
}

class Sandwich {
	constructor({ name, size, price } = {}) {
		this.setName(name);
		this.setSize(size);
		this.setPrice(price);
	}

	setName(name) {
		this.name = name;
	}

	setPrice(price) {
		this.price = price;
	}

	setSize(size) {
		const sizesList = new Sizes();

		if (sizesList.includes(size)) {
			this.size = size;
		}
	}
}

const run = () => {
	const TunaSandwich = new Sandwich({
		name: "Tuna Sandwich",
		size: "medium",
		price: 2.5,
	});

	console.log(TunaSandwich);
};

run();
```

존 록 

덴
마일즈, 프릭, 에디, 알렉스, 데이빗, 토미,

## Liskov Substitution Principle, 리스코프 치환 원칙

>**- 자식 클래스는 부모클래스에서 가능한 행위를 수행할 수 있어야 한다.**




## Dependency Inversion Principle, 의존 역전 원칙

>**- 의존 관계를 맺을 때, 변화하기 쉬운것 보단 변화하기 어려운 것에 의존해야 한다는 원칙이다.**





## Interface Segregation Principle, 인터페이스 분리 원칙

>**- 한 클래스는 자신이 사용하지 않는 인터페이스는 구현하지 말아야 한다. 하나의 일반적인 인터페이스보다는, 여러 개의 구체적인 인터페이스가 낫다.**



