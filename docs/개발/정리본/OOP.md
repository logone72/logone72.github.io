
1. _추상화_ (Abstraction)
2. _캡슐화_ (Encapsulation)
3. _상속_ (Inheritance)
4. _다형성_ (Polymorphism)


## 추상화 (Abstraction)

객체들의 공통적인 특징(속성, 기능)을 뽑아 이름을 붙이는 것

-   클래스 VS 객체
    -   **클래스** : 분류에 대한 **개념** -> 같은 특성을 지닌 여러 객체를 총칭하는 집합의 개념 (ex.사람)
    -   **객체** : **실체** -> 유일무이한 사물 (ex. 모모)
-   추상화  
    : 구체적인 것을 분해해서 **관심 영역 (애플리케이션 경계)** 에 있는 특성만 가지고 재조합하는 것 (= 모델링)


## 캡슐화(Encapsulation)

특정 객체가 독립적으로 역할을 제대로 수행하기 위해 필요한 데이터와 기능을 하나로 묶은 것 (모듈화의 의미)

정보를 객체 안에 포함시키고, 그 정보에 대한 직접 접근은 허용하지 않는 대신, 필요에 따라 확인할 수 있는 인터페이스를 외부에 공개하는 방식


### 캡슐화와 은닉화은 차이?

**은닉화**는 외부에서 객체의 속성을 함부로 접근하지 못하도록 하는 것이다.
**캡슐화**는 메서드 안에서 어떠한 일이 일어나고 있는지 모르게 해야한다는 것이다.


## 상속(Inheritance)

상위 개념의 특징을 하위 개념이 물려받는 것

-   **하위 클래스 - 상위 클래스**  
    -   하위 클래스는 상위클래스 특성을 **재사용**하고, **확장**한다.
    -   상위 클래스의 물려줄 특성이 많을수록 좋다
-   **인터페이스**
    -   다중 상속 대신 도입
    -   어떤 객체가 **해야할 일**을 정의하는 **추상** 자료형
    -   구현 클래스 is able to 인터페이스 (ex. Runnable)
    -   인터 페이스는 구현을 강제할 메서드가 적을수록 좋다


## 다형성(Polymorphism)

모듈이 갖고있는 정체성과 표현방식

다형성을 극대화 하기 위해 추상클래스나 인터페이스를 이용한다.

-   오버라이딩
    -   같은 메서드 이름 / 같은 인자 목록 / 상위 클래스의 메서드 **재정의**
    -   상위 클래스 타입의 객체 참조 변수에서 자동으로 하위 클래스가 오버라이딩한 메소드를 호출해 줌
-   오버로딩
    -   같은 메서드 이름 / 다른 인자 목록 / 다수의 메서드 **중복 정의**

