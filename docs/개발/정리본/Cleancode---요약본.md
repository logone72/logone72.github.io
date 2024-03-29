
🕊️ Robert C.Martin의 "Clean code" 요약
[원글](https://medium.com/thedevproject/summary-of-clean-code-by-robert-c-martin-7117b3947cb8)


'클린 코드'라는 유명한 책이 있습니다. 개발자라면 한 번씩은 읽거나, 사려고 마음먹거나, 스쳐 지나가면서 봤거나 하는 책입니다. 그러나 굉장히 두꺼워서 마음먹고 읽기 쉽지 않습니다. 이번에는 그런 분들을 위해(저를 위해) '클린 코드'를 요약한 글을 가져왔습니다. 


## 📌 일반적인 규칙 

1️⃣ 표준 컨벤션을 따르자. * convention: 읽고, 관리하기 쉬운 코드를 작성하기 위한 코딩 스타일 규약
2️⃣ 간단하게 만들어라. 복잡한 것을 최대한 줄여라.
3️⃣ 찾았을 때보다 더 깨끗하게 만들고 떠나라. 4️⃣ 항상 문제의 근본 원인을 찾아라. 


## 📌 디자인 규칙 

1️⃣ 데이터를 high-level로 유지하라. 
2️⃣ if/else 또는 switch/case 보다 다형성을 선호하라. 
3️⃣ multi-threading 코드를 분리하라. 
4️⃣ 과도한 구성을 방지하라. 
5️⃣ 의존성 주입을 사용하라. 
6️⃣ 클래스는 직접적인 의존성만 알아야 한다. 


## 📌 이해도 높이는 팁 

1️⃣ 일관되게 하라. 당신이 어떤 특정한 방법을 사용한다면, 모든 것들을 같은 방법으로 만들어라. 
2️⃣ 설명 변수를 사용하라. 
3️⃣ 경계 조건을 캡슐화 하라. 
4️⃣ 기본 형식보다 전용 객체를 선호하라. 
5️⃣ 논리적 종속성을 피하라. 같은 클래스의 다른 것에 의존해야 올바르게 작동하는 메서드를 작성하지 마라. 
6️⃣ 부정적인 조건을 피하라. 


## 📌 네이밍 규칙 

1️⃣ 알기 쉬운 이름을 사용하라. 
2️⃣ 의미 있게 구분하라. 
3️⃣ 발음하기 쉬운 이름을 사용하라. 
4️⃣ 검색하기 쉬운 이름을 사용하라. 
5️⃣ 매직 넘버를 상수로 바꾸어라. *magic number*: 코드 안에 적힌 구체적인 수치 값 
6️⃣ 인코딩을 피하라. 접두어나 타입 정보를 더하지 마라. 


## 📌 함수 규칙 

1️⃣ 작게 만들어라. 
2️⃣ 하나의 기능만 수행하게 해라. 
3️⃣ 서술적인 이름을 사용하라.
4️⃣ 더 적은 인수를 사용하라.
5️⃣ 사이드 이펙트가 일어나지 않게 하라. * side effect: 원래의 목적과 다른 효과 또는 부작용
6️⃣ 플래그 인수를 사용하지 마라. 


## 📌 주석 규칙 

1️⃣ 항상 코드로 의도를 표현하려고 애써라.
2️⃣ 같은 내용을 중복하지 마라. 
3️⃣ 쓸데없는 잡음을 추가하지 마라.
4️⃣ 닫는 괄호에 주석을 추가하지 마라.
5️⃣ 주석으로 코드를 처리하지 마라. 그냥 지워라. 
6️⃣ 의도를 설명하는 의미로 사용하라. 
7️⃣ 의미를 명료하게 밝히는 의미로 사용하라. 
8️⃣ 결과를 경고하는 의미로 사용하라. 


## 📌 소스 코드 구조 

1️⃣ 개념은 빈 행으로 분리하라. 
2️⃣ 연관된 코드는 세로로 가깝게 유지하라. 
3️⃣ 변수를 그들의 사용처에 가깝게 선언하라. 
4️⃣ 종속된 메서드를 가깝게 유지하라. 
5️⃣ 유사한 기능을 가깝게 유지하라. 
6️⃣ 함수를 아래 방향으로 위치하라. 
7️⃣ 길이를 짧게 유지하라. 
8️⃣ 가로 정렬을 사용하지 마라. 
9️⃣ 연관된 것들을 연관시키고 상대적으로 비연관성인 것들은 제거하기 위해 공백을 사용하라. 
🔟 들여쓰기를 깨지 마라. 

## 📌 객체와 자료구조 

1️⃣ 내부의 구조를 숨겨라. 
2️⃣ 자료구조를 선호하라. 
3️⃣ 잡종 구조를 만들지 마라. 
4️⃣ 작게 만들어라. 
5️⃣ 한 가지 기능을 하게 만들어라. 
6️⃣ 인스턴스 변수의 갯수를 작게 하라.
7️⃣ 베이스 클래스가 자신이 조작하는 객체의 속사정을 모르게 하라. 
8️⃣ 어떤 동작을 선택하기 위해, 메서드에 일부 코드를 전달하는 것 보다 많은 메서드를 만드는 것이 낫다. 
9️⃣ 정적 메서드보다 동적 메서드를 선호하라. 

## 📌 테스트 

1️⃣ 하나의 테스트 당 assert 하나 
2️⃣ 읽기 쉽게. 
3️⃣ 빠르게. 
4️⃣ 독립적으로. 
5️⃣ 반복 가능하게. 

## 📌 코드 스멜 
*code smell: 심각한 문제를 일으킬 가능성이 있는 소스 코드의 특징 

1️⃣ 강직성. 코드를 변경시키기 어려움. 작은 변경이 일련의 변화를 일으킬 수 있음. 
2️⃣ 취약성. 작은 변화 만으로도 파괴가 될 수 있음. 
3️⃣ 부동성. 높은 위험 때문에 코드의 일부분을 다른 프로젝트에서 재사용 할 수 없음. 
4️⃣ 불필요한 복잡성. 
5️⃣ 불필요한 반복. 
6️⃣ 불투명함. 

이해하기 어려운 코드. 🐣 아는 것보다 어려운 실천하기. 🐣 더 자세한 예시와 설명이 보고 싶다면 책을 읽어보자.