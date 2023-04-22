[how can i access my localhost from my android device - stackoverflow](https://stackoverflow.com/questions/4779963/how-can-i-access-my-localhost-from-my-android-device)

[cant access localhost via ip - stackoverflow](https://stackoverflow.com/questions/38175020/cant-access-localhost-via-ip-address)


localhost로 작업 중인 내용을 호스팅할 때, 다른 장비에서 확인하려면 어떻게 해야할까?

호환성등을 확인하기 위해 pc가 아닌 모바일 환경에서 웹을 띄워보고 싶을 수 있다. 개발자도구의 device toolbar 만으로는 확인 할 수 없는 요소들이 분명 존재한다.

대부분 이러한 작업을 할 때 같은 와이파이를 사용하는 (같은 라우터로 연결되어 있을때) 경우 간단하게 할 수 있다.

호스팅 중인 기기의 ip 주소를 [http://10.0.0.16:9000/][1] 와 같은 형식으로 모바일 기기의 브라우저에서 열어보면된다. 

> public이 아닌 private ip 주소를 사용해야한다. 

다만 호스팅을 할때 `config` 의 `host` 세팅을 `localhost` 나 `127.0.0.1`이 아닌 `0.0.0.0`으로 해야한다. 

`0.0.0.0`의 의미는 어떠한 접속도 허용하겠다는 것으로, 보안상의 위험성이 생기기에 이러한 목적이 아니면 `localhost`로 세팅을 해두는 것이 안전할 것이다.


In a hole in the ground there lived a ==hobbit==. Not a nasty, dirty, wet hole, filled with the ends
of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to
eat: it was a [hobbit-hole][1], and that means comfort.
