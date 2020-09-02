(function(global) {

    'use strict';
  
    // define variables 전체 타임라인 범위 정의
    var items = document.querySelectorAll(".timeline li");
  
    // check if an element is in viewport 타임라인 요소가 뷰포트(화면 페이지) 안에 들어있나 체크( 동적인 애니메이션 추가시 사용)
    // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport

    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    function callbackFunc() {
      // console.log(1);
      for (var i = 0; i < items.length ; i++) {
        if (isElementInViewport(items[i])) {
          items[i].classList.add("in-view");   //in-view에 items[i]d에 해당하는 값 추가
        }
        else {
          items[i].classList.remove("in-view"); //in-view에서 items[i]d에 해당하는 값 빼기
        }
      }
    }
    
    // listen for events
    // window.addEventListener("load", callbackFunc);
    // window.addEventListener("resize", callbackFunc);
    // window.addEventListener("scroll", callbackFunc); //이렇게 하면 기본 스크롤 바만 인식해서
    //  section에 따로 만든 스크롤 바에 동작을 줘서는 작동하지 않았다.
    document.querySelector(".timeline").addEventListener("scroll", callbackFunc);
    document.querySelector(".timeline").addEventListener("resize", callbackFunc);
    // document.querySelector(".timeline").addEventListener("load", callbackFunc);
    // window.addEventListener("mousewheel", callbackFunc); // 그래서 마우스 휠으로 지정했다 되긴 하는데
    // 스크롤 바를 직접 움직인다던가 하는 입력에는 작동하지 않으니깐 안좋은 적용법인듯
    global.showTimeline = callbackFunc;
  })(window||this);

  document.addEventListener("DOMContentLoaded", function(){
    showTimeline();
  });