
```js
/**  
 * drag, swipe 등의 제스쳐들은 무시하고, 딱 클릭(touch)할때만 작동하는 이벤트 등록하는 함수  
 * @param {EventTarget} _$target  
 * @param {function} _clickHandler 클릭시 동작하기를 원하는 함수  
 * @param {{[throttle]:number, [capture]:boolean, [additionalHandler]:Object}} [_option]  
 * throttle: 몇 pixel 단위까지 이동까지만 클릭으로 허용할건지  
 * capture: eventListener capture 옵션과 동일  
 * additionalHandler: 각각 touchstart,touchmmove,touchend에서 클릭 동작외에 실행되길 원하는 함수  
 */  
const addOnlyClickTouchEvent = (_$target = document, _clickHandler, _option = {}) => {  
  const { throttle = 3, capture = false, additionalHandler = {} } = _option;  
  let isDrag = false;  
  let startX, startY;  
  
  const checkIsDragged = (_endX, _endY) => {  
    if (isNaN(startX) || isNaN(startY) || isNaN(_endX) || isNaN(_endY))  
      return false;  
  
    const diffX = Math.abs(_endX - startX);  
    const diffY = Math.abs(_endY - startY);  
  
    return diffX > throttle || diffY > throttle;  
  };  
  
  const touchStartHandler = (e) => {  
    if (typeof additionalHandler.touchstart === 'function')  
      additionalHandler.touchstart(e);  
  
    startX = e.touches[0].clientX;  
    startY = e.touches[0].clientY;  
    isDrag = false;  
  };  
  
  const touchMoveHandler = (e) => {  
    if (typeof additionalHandler.touchmove === 'function')  
      additionalHandler.touchmove(e);  
  
    const endX = e?.touches?.[0]?.clientX;  
    const endY = e?.touches?.[0]?.clientY;  
    isDrag = checkIsDragged(endX, endY);  
  };  
  
  const touchEndHandler = (e) => {  
    if (typeof additionalHandler.touchend === 'function')  
      additionalHandler.touchend(e);  
  
    if (isDrag)  
      return;  
    if (typeof _clickHandler === 'function')  
      _clickHandler(e);  
  };  
  
  _$target.addEventListener('touchstart', touchStartHandler, capture);  
  _$target.addEventListener('touchmove', touchMoveHandler, capture);  
  _$target.addEventListener('touchend', touchEndHandler, capture);  
};  
  
export {  
  addOnlyClickTouchEvent,  
};
```