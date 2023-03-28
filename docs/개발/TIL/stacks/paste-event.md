2022/07/27

https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event

paste event 는 클립보드에 저장된 복사된 내용이 input에 대입되기(_붙혀넣기_) 전에 발생한다. 

따라서 paste event 시점에서 input의 value를 가져와도 내용은 없다.

복사된 내용이 실제로 반영되는 것은 paste event의 default 액션으로, 해당 이벤트 리스너에 preventDefault 가 실행될 경우 어떠한 내용도 붙혀넣기가 되지 않는다. 


paste ->  keyup -> change 