//slider principal
let mainCarousel = document.querySelector('.main-carousel');
let flktyMain = new Flickity( mainCarousel, {
  imagesLoaded: true,
  percentPosition: false,
  autoPlay: true,
  lazyLoad: true,
  wrapAround: true,
  setGallerySize: false,
  prevNextButtons: false,
  pauseAutoPlayOnHover: false,
  pageDots:false
});

let mainImgs = mainCarousel.querySelectorAll('.main-carousel-cell img');
// get transform property
let docStyle = document.documentElement.style;
let transformProp = typeof docStyle.transform == 'string' ?
  'transform' : 'WebkitTransform';

flktyMain.on( 'scroll', function() {
  flktyMain.slides.forEach( function( slide, i ) {
    let mainImg = mainImgs[i];
    let x = ( slide.target + flktyMain.x ) * -2/3;
    mainImg.style[ transformProp ] = 'translate(' + x  + 'px)';
  });
});

//slider pagina details
function carouselForDetails(){
  let detailsCarousel = document.querySelector("#product-details-slider");
  let flktyDetails = new Flickity( detailsCarousel, {
    imagesLoaded: true,
    autoPlay: false,
    lazyLoad: true,
    wrapAround: true,
    prevNextButtons: false,
    pageDots:true
  });

  let detailsImgs = detailsCarousel.querySelectorAll('.details-carousel-cell img');

  flktyDetails.on('scroll',function(){
    flktyDetails.slides.forEach( function( slide, i ) {
      let detailsImg = detailsImgs[i];
      let x = ( slide.target + flktyDetails.x ) * 1/1;
      if(window.innerWidth <= 768){
        detailsImg.style[ transformProp ] = 'translate(' + (x - 20)  + 'px)';
      } else if(window.innerWidth <= 1200){
        detailsImg.style[ transformProp ] = 'translate(' + (x + 55)  + 'px)';
      } else if(window.innerWidth <= 1378){
        detailsImg.style[ transformProp ] = 'translate(' + (x + 75)  + 'px)';
      } else {
        detailsImg.style[ transformProp ] = 'translate(' + (x + 125)  + 'px)';
      }
    });
  })
}
