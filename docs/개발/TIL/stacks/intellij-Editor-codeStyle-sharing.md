

## intellij 전용

해당 방식의 코드스타일 공유 방법은 jetbrains의 intellij 계열의 IDE (integrated development environment) 에서 만 사용할 수 있습니다.

### 코드 스타일 수정 방법

	  webstrom → preferences → Editor → (Any Language) → 상단의 Scheme 을 Default → Project로 변경

그 후 하단 탭에서 원하는 설정들을 직접 편집하면, .idea/codeStyle 디렉토리의 codeStyleConfig.xml 과 Project.xml 의 내용이 변경됩니다. 

### 설정

.idea 디렉토리는 기본적으로 git ignore 의 대상이기에, 이를 변경해주어야합니다.

```
.idea/*  
!.idea/codeStyles/  
.idea/codeStyles/*  
!.idea/codeStyles/Project.xml  
!.idea/codeStyles/codeStyleConfig.xml
```


### 적용

같은 프로젝트의 동료가 공유해준 코드스타일 파일을 git을 통해 pull 받았다면, 

	  webstrom → preferences → Editor → (Any Language) → 상단의 Scheme 을 Default → Project로 변경

위와 같은 과정을 통해 언어별로 적용시켜주면 됩니다.
