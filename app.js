const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
// const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div)
  })
  loadingSpinner();
}

const getImages = (query) => {
  loadingSpinner();
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits))
    .catch(err => console.log(err))
    
}



const sliderImageRemove = (array, value) => { 
    
  return array.filter(function(image){ 
      return image != value; 
  });
}

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.toggle('added');
 
  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } 
  else{
    sliders = sliderImageRemove(sliders, img);
  }
  let selectedImg = sliders.length;
  const selected = document.getElementById('selected');
  selected.innerText = `You have selected ${selectedImg} Images` ;
}

var timer
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    const minSelect = document.getElementById('min-select').innerText = "Select at least 2 image.";
    // alert('Select at least 2 image.')
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
  // Bonus one solve 
  let durationInSecond = document.getElementById('duration').value || 1;
  let duration = durationInSecond * 1000;
  if(duration <=1000){
    duration = 1000;
  }
   // Bonus one solve
  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item)
  })
  changeSlide(0)
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  }, duration);
}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

function sarchBtn() {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
};
// searchBtn.addEventListener('click', function () {
//   document.querySelector('.main').style.display = 'none';
//   clearInterval(timer);
//   const search = document.getElementById('search');
//   getImages(search.value)
//   sliders.length = 0;
// })

document.getElementById('search')
  .addEventListener("keypress", function (event) {
 if(event.key == "Enter") {
  sarchBtn();
 }
});

sliderBtn.addEventListener('click', function () {
  createSlider()
})

   // Bonus two solve
const loadingSpinner = () =>{
  const spinner =document.getElementById('loading-spinner');
  spinner.classList.toggle('d-none');
}
// Bonus two solve
