
[intellij](https://gmlwjd9405.github.io/tags#intellij) [shortkey](https://gmlwjd9405.github.io/tags#shortkey) [hotkey](https://gmlwjd9405.github.io/tags#hotkey) [단축키](https://gmlwjd9405.github.io/tags#%EB%8B%A8%EC%B6%95%ED%82%A4)

# [IntelliJ] intellij 유용한 단축키 정리

[heejeong Kwon](http://gmlwjd9405.github.io/) 21 May 2019

## intellij에서 유용한 단축키를 알아보자.

[인프런 강의](https://www.inflearn.com/course/intellij-guide/lecture/13200) 참고

## 요약

- 라인 복제하기: Cmd + d
- 라인 단위로 옮기기
	- 문법 상관(x): Opt + Shift + ↑↓
        - 문법 상관(o): Cmd + Shift + ↑↓


## Contents

> -   코드 Edit
> -   포커스
> -   검색
> -   자동완성
> -   리팩토링
> -   디버깅
> -   Git
> -   플러그인

```toc
```


## 기본 단축키

### 디렉터리, 패키지, 클래스 등 생성 목록 보기

-   MacOS: Cmd + n

## 코드 Edit

### Main method 생성 및 실행

-   메인 메서드 선언
    -   live template 이용: `psvm`
    -   (live template은 아래 참고)
-   메인 메서드 실행
    1.  좌측 실행 버튼
    2.  단축키
        
        -   _현재 Focus_ 가 해당 메서드에 있어야 함
        
        -   MacOS: Ctrl + Shift + r
        -   Win/Linux: Ctrl + Shift + F10 - _이전 실행문_ 재실행 (우측 상단에 실행문 목록 확인 가능)
        -   MacOS: Ctrl + r
        -   Win/Linux: Shift + F10

### 라인 수정하기

-   라인 복제하기
    -   MacOS: Cmd + d

-   라인 삭제하기
    -   MacOS: Cmd + 백스페이스

-   문자열 라인 합치기
    -   MacOS: Ctrl + Shift + j

-   라인 단위로 옮기기
    -   1) 문법에 관계 없이 라인 이동
        -   MacOS: Opt + Shift + ↑↓
        -  
    -   2) 구문 안에서만 라인 이동 (메서드를 벗어날 수 없음)
        -   MacOS: Cmd + Shift + ↑↓
        -   
-   Element 단위로 옮기기
    -   Ex. html, xml 등의 규격이 정해진 마크업 언어에서 활용
    -   MacOS: Cmd + Opt + Shift + ←→


### 코드 즉시 보기

-   인자값 즉시 보기 (Parameter Info)
    -   MacOS: Cmd + p

-   코드 구현부 즉시 보기 (Quick Definition)
    -   클래스- 클래스 전체 코드
    -   인스턴스- 인스턴스 생성 코드
    -   메서드- 메서드 정의 코드
    -   MacOS: Opt + Space

-   Doc 즉시 보기 (Quick Documentation)
    -   MacOS: F1

## 포커스

### 포커스 에디터

-   단어별 이동
    -   MacOS: Opt + ←→

-   단어별 선택 (Move Caret to Next Word with Selection)
    -   MacOS: Opt + Shift + ←→

-   라인 첫/끝 이동
    -   MacOS: fn + ←→

-   라인 전체 선택
    -   MacOS: fn + Shift + ←→

-   Page Up/Down
    -   MacOS: fn + ↑↓


### 포커스 특수키

-   포커스 범위 한 단계씩 늘리기 (Extend Selection)
    -   해당 커서의 단어 포커스하기
    -   MacOS: Opt + ↑↓

-   포커스 뒤로/앞으로 가기 (Navigate -> Back/Forward)
    -   이전 커서가 있던 화면으로 돌아갈 때 유용
    -   클래스 이동도 가능
    -   MacOS: Cmd + [ 또는 ]

-   멀티 포커스 (Clone Caret Below)
    -   MacOS: Opt + Opt + ↓ (Opt 누른 상태)

-   오류 라인으로 자동 포커스 (Navigate -> Next Highlighted Error)
    -   MacOS: F2


## 검색

### 검색 텍스트

-   현재 파일에서 검색 (Find)
    -   MacOS: Cmd + f

-   현재 파일에서 교체 (Replace)
    -   MacOS: Cmd + r

-   전체에서 검색 (Find in Path)
    -   MacOS: Cmd + Shift + f

-   전체에서 교체 (Replace in Path)
    -   MacOS: Cmd + Shift + r

-   정규표현식으로 검색, 교체
    -   [Find/Replace] -> Regex 체크


### 검색 기타

-   파일 검색 (Navigate -> File)
    -   MacOS: Cmd + Shift + o / Shfit + Shift

-   메서드 검색 (Navigate -> Symbol)
    -   MacOS: Cmd + Opt + o

-   **Action 검색** (Find Action: Enter action or option name)
    -   MacOS: Cmd + Shift + a

-   최근 열었던 파일 목록 보기 (Recent Files)
    -   MacOS: Cmd + e

-   최근 수정한 파일 목록 보기 (Recently Changed Files)
    -   MacOS: Cmd + Shift + e



## 자동완성

### 자동완성

-   기본 자동완성 (Completion -> Basic)
    -   MacOS: Ctrl + Space

-   스마트 자동완성 (Completion -> SmartType)
    -   MacOS: Ctrl + Shift + Space

-   static method 자동완성
    -   MacOS: Ctrl + Space + Space

-   getter/setter/생성자 자동완성 (Generate)
    -   MacOS: Cmd + n

-   Override 메서드 자동완성 (Implement Methods)
    -   MacOS: Ctrl + i


### Live Template (Code Template)

-   live template 목록 확인하기 (Insert Live Template)
    -   [Find Action] -> Live Templates 입력
    -   MacOS: Cmd + j

-   자주 사용하는 live template 예시
    -   **`psvm`**: 메인메서드 선언
    -   **`sout`**: System.out.println(); 자동 생성
-   나만의 live template 추가하기
    1.  [Find Action] -> Live Templates 입력
    2.  other 선택 -> “+” 버튼 -> Live Template
    3.  Abbreviation(축약어)
        -   Ex. ent
    4.  Description(설명)
        -   Ex. Entity Class Header
    5.  Template text(텍스트)
        -   아래 예시
    6.  Error(No applicable contexts yet.)에서 Define 클릭
        -   Ex. Java 선택
    7.  Apply & OK


## 리팩토링

### 리팩토링 Extract

-   변수 추출하기 (Extract -> Variable)
    -   MacOS: Cmd + Opt + v

-   파라미터 추출하기 (Extract -> Parameter)
    -   MacOS: Cmd + Opt + p

-   **메서드 추출하기** (Extract -> Method)
    -   MacOS: Cmd + Opt + m

-   이너클래스 추출하기
    -   MacOS: F6


### 리팩토링 기타

-   이름 일괄 변경하기 (Rename)
    -   MacOS: Shift + F6

-   타입 일괄 변경하기 (Type Migration)
    -   MacOS: Cmd + Shift + F6

-   Import 정리하기 (Optimize Imports)
    -   MacOS: Ctrl + Opt + o
    -   _자동 설정:_ [Find Action] -> Optimize imports on 입력 -> “Auto import: …”

-   코드 자동 정렬하기 (Reformat Code)
    -   MacOS: Cmd + Opt + l


## 디버깅

### 디버깅

-   Break Point 걸기 (Toggle Line Breakpoint)
    -   해당 라인 number 옆 클릭
    -   MacOS: Cmd + F8
    -   Break Point의 라인은 아직 실행하기 전 상태이다.

-   Conditional Break Point
    -   반복문에서 특정값을 가지고 있는 객체가 나왔을 때만 멈추고자 할 때 유용
    -   Break Point (빨간원) 우클릭 -> 조건 입력
        -   Ex. “HEEE”.equals(user.name)
-   Debug 모드로 실행하기 - 즉시 실행 (Debug)
    -   _현재 Focus_ 가 해당 메서드에 있어야 함
    -   좌측 디버그 실행 버튼
    -   MacOS: Ctrl + Shift + d
    -   Win/Linux: 없음 (커스텀해서 사용하거나 마우스 이용)
-   Debug 모드로 실행하기 - 이전 실행
    -   _이전 실행문_ 재실행 (우측 상단에 실행문 목록 확인 가능)
    -   MacOS: Ctrl + d
    -   Win/Linux: Shift + F9

### Breaking 상태에서의 기능

![](https://gmlwjd9405.github.io/images/etc/intellij-shortkey-debug.png)

-   **Resume** (다음 Break Point로 넘어가기)
    -   MacOS: Opt + Cmd + r
    -   Win/Linux: F9
-   참고 Debugger 탭 설명
    -   Debugger 탭 좌측 창 - Call Stack
        -   현재 Break Point로 넘어오기까지 실행한 메서드 목록
        -   오픈 소스 코드를 분석할 때 유용
    -   Debugger 탭 우측 창 - Variables
        -   현재 Break Point에서 볼 수 있는 변수값 목록
-   Step Over (다음 라인으로 넘어가기)
    -   MacOS: F8
    -   Win/Linux: F8
-   Step Into (해당 라인 안(다음 메서드)으로 들어가기)
    -   MacOS: F7
    -   Win/Linux: F7
-   Step Out (현재 포커스를 밖으로 빼기)
    -   MacOS: Shift + F8
    -   Win/Linux: Shift + F8
-   Evaluate Expression (현재 Breaking 상태에서 즉시 코드 실행하기)
    -   MacOS: Opt + F8
    -   Win/Linux: Alt + F8
    -   데이터가 잘 들어갔는지 확인할 때 유용
    -   켤 때마다 초기화 - 단발성 코드를 실행할 때 유용
-   Watch (Breaking 이후의 코드 변경 확인하기)
    -   MacOS: 없음
    -   Win/Linux: 없음
    -   다음 Break Point 전까지 확인하고 싶은 값을 계속 주시하고자할 때 유용

## Git & Github

### Git 기본 기본 기능 사용하기

-   Git View On
    -   View 탭 -> Tool Windows -> Version Control
    -   MacOS: Cmd + 9
    -   Win/Linux: Alt + 9
-   Git Option Popup (VCS Operations Popup)
    -   MacOS: Ctrl + v
    -   Win/Linux: Alt + `(Back Quote)
-   Git History
    -   MacOS: Ctrl + v => 4
    -   Win/Linux: Alt + ` => 4
-   Branch
    -   MacOS: Ctrl + v => 7
    -   Win/Linux: Alt + ` => 7
-   Commit
    -   MacOS: Cmd + k
    -   Win/Linux: Ctrl + k
-   Push
    -   MacOS: Cmd + Shift + k
    -   Win/Linux: Ctrl + Shift + k
-   Pull
    -   MacOS: [Find Action] => git pull 검색
    -   Win/Linux: [Find Action] => git pull 검색

## 플러그인

### 플러그인 설치 방법

1.  [Find Action] -> plugins 입력 -> Preferences/Settings의 Plugins 선택
2.  Browse repositories… 클릭
3.  Sort by: Downloads 로 설정

### 추천 플러그인

-   **presentation assistant**
    -   다른 OS에서 해당 단축키가 어떤 것인지 알려준다.
    -   발표/시연용으로 사용할 때 유용하다.
-   **.gitignore**
    -   자동완성 기능을 제공한다.
-   **BashSupport**
    -   실행 파일에 대한 여러 기능을 제공한다.
    -   Cf. 실행 권한 변경 후 실행 가능
        -   `chmod +x app.sh`
-   **Material Theme UI**
    -   추천 테마
-   **jojoldu Translation**
    -   영문 코드를 한글로, 한글을 영문으로 번역해주는 기능을 제공한다.

# 관련된 Post

-   Vim에서 유용한 단축키에 대해 알고 싶으시면 [Vim 유용한 단축키 정리](https://gmlwjd9405.github.io/2019/05/14/vim-shortkey.html)를 참고하시기 바랍니다.

# Reference

> -   [https://www.inflearn.com/course/intellij-guide/lecture/13200](https://www.inflearn.com/course/intellij-guide/lecture/13200)
> -   [이미지 참고](https://www.yasir252.com/software/programming-tools/jetbrains-intellij-full-version/)


