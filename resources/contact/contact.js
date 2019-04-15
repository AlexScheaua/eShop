function drawContact(){
  let contactContainer = document.querySelector("#contact-container");
  contactContainer.innerHTML = `
    <div class="under-construction d-flex justify-center align-center">
      <p class="d-flex justify-center align-center">Page under construction</p>
      <svg width="100px" height="100px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-double-ring" style="filter: drop-shadow(0 0 3px #888);"><circle cx="50" cy="50" ng-attr-r="{{config.radius}}" ng-attr-stroke-width="{{config.width}}" ng-attr-stroke="{{config.c1}}" ng-attr-stroke-dasharray="{{config.dasharray}}" fill="none" stroke-linecap="round" r="20" stroke-width="5" stroke="#6fd5d5" stroke-dasharray="31.41592653589793 31.41592653589793" transform="rotate(23.6822 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle><circle cx="50" cy="50" ng-attr-r="{{config.radius2}}" ng-attr-stroke-width="{{config.width}}" ng-attr-stroke="{{config.c2}}" ng-attr-stroke-dasharray="{{config.dasharray2}}" ng-attr-stroke-dashoffset="{{config.dashoffset2}}" fill="none" stroke-linecap="round" r="14" stroke-width="5" stroke="#333" stroke-dasharray="21.991148575128552 21.991148575128552" stroke-dashoffset="21.991148575128552" transform="rotate(-23.6822 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;-360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>
    </div>
  `

  setLoadingGif(false);
  drawSearch();
}
