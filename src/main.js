
import SimpleLightbox from "simplelightbox";  
import "simplelightbox/dist/simple-lightbox.min.css";  

import "izitoast/dist/css/iziToast.min.css";  
import iziToast from "izitoast";  

import { fetchImages, PER_PAGE } from "./js/pixabay-api";  
import { createMarkup } from "./js/render-functions";  
  

const formEl = document.querySelector('.form');  
const galleryEl = document.querySelector('.gallery');  
const loaderEl = document.querySelector('.loader');  
const btnMoreEl = document.querySelector('.btn-more');  

let lightbox = new SimpleLightbox('.gallery a', {});


formEl.addEventListener('submit', handleSubmit);
btnMoreEl.addEventListener('click', onLoadMoreClick);

let currentPage = 1;
let query = '';

async function handleSubmit(event) {
  event.preventDefault();
  
  const foundValue = event.target.elements.query.value.trim();
  
  query = foundValue;
  currentPage = 1;
  galleryEl.innerHTML = '';
  btnMoreEl.classList.remove('is-hidden');

  if (!foundValue) {
    iziToast.error({
      message: 'Please enter a search word',
      position: 'topRight',
    });
    btnMoreEl.classList.add('is-hidden');
    return;
  }
  loaderEl.classList.add('is-hidden');

  try {
    const { hits } = await fetchImages(query, currentPage);
    if (!hits || hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    hits.length < PER_PAGE
      ? btnMoreEl.classList.remove('is-hidden')
      : btnMoreEl.classList.add('is-hidden');
    
    const markup = createMarkup(hits);
    galleryEl.insertAdjacentHTML("beforeend", markup);

    lightbox.refresh();
  } catch (error) {
    console.log(error.message);
  } finally {
    loaderEl.classList.remove('is-visible');
    formEl.reset();
  }
};

async function onLoadMoreClick() {
  currentPage += 1;

  try {
    loaderEl.classList.add('is-hidden');
    btnMoreEl.classList.remove('is-hidden');

    const { hits, totalHits } = await fetchImages(query, currentPage);
    const markup = createMarkup(hits);
    galleryEl.insertAdjacentHTML("beforeend", markup);

    lightbox.refresh();

    handleScrollView();

    if (currentPage > Math.ceil(totalHits / PER_PAGE) - 1) {
      btnMoreEl.classList.remove('is-hidden');
      iziToast.error({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }
    btnMoreEl.classList.add('is-hidden');
  } catch (error) {
    console.log(error.message);
  } finally {
    loaderEl.classList.remove('is-hidden');
  }
};

function handleScrollView() {
  const imageHeight = galleryEl.querySelector('li');
  const articleHeight = imageHeight.getBoundingClientRect().height;
  const scrollHeight = articleHeight * 2 + 140;

  window.scrollBy({
    top: scrollHeight,
    left: 0,
    behavior: 'smooth',
  });
}

// const elementForSearch = async event => {
//   try {
//     event.preventDefault();
//     query = event.target.elements.choiceSearch.value.toLowerCase().trim();

//     page = 1;
// 	galleryEl.innerHTML = '';
//     //
//     if (!query) {
//       iziToast.error({ message: 'Please enter a search word.' });
//       return;
//     }
//     //
//     loaderEl.style.display = 'block';
//     //
//     const response = await fetchImages(query, page);
//     //
//     if (response.data.totalHits === 0) {
//       btnMoreEl.classList.add('is-hidden');
//       iziToast.info({
//         message:
//           'Sorry, there are no images matching your search query. Please try again!',
//       });
//       galleryEl.innerHTML = '';
//       return;
//     }
//     //
//     createMarkup(response.data.hits, galleryEl);
//     //
//     const cardList = galleryEl.querySelector('li');
//     cardHeight = cardList.getBoundingClientRect().height;
//     //
//     if (response.data.totalHits > 15) {
//       btnMoreEl.classList.remove('is-hidden');
//     }else{
// 		btnMoreEl.classList.add('is-hidden');
// 	}
//     //
//     lightbox.refresh();
//     //
//     formEl.reset();

//     //todo
//   } catch (err) {
//     iziToast.error({
//       message: err.message,
//       messageColor: '#fff',
//       position: 'topRight',
//       color: '#ef4040',
//       maxWidth: '350px',
//     });

//     //todo
//   } finally {
//     loaderEl.style.display = 'none';
//     formEl.reset();
//   }
// };

// //! second function
// const onLoadMoreClick = async () => {
//   //todo
//   try {
//     page += 1;
//     //
//     btnMoreEl.classList.add('is-hidden');
//     //
//     loaderEl.style.display = 'block';
//     //
//     const response = await fetchImages(query, page); 
//     //
//     createMarkup(response.data.hits, galleryEl);
//     //
//     lightbox.refresh();
//     //
//     scrollBy({
//       top: cardHeight * 2,
//       behavior: 'smooth',
//     });
//     //
//     btnMoreEl.classList.remove('is-hidden');
//     //
//     if (page === Math.ceil(response.data.totalHits / 15)) {
//       btnMoreEl.classList.add('is-hidden');
//       iziToast.warning({
//         title: 'Info',
//         message: 'Were sorry, but you have reached the end of search results.',
//         position: 'topRight',
//       });
//     }

//     //todo
//   } catch (err) {
//     iziToast.error({
//       message: err.message,
//       messageColor: '#fff',
//       position: 'topRight',
//       color: '#ef4040',
//       maxWidth: '350px',
//     });

//     //todo
//   } finally {
//     loaderEl.style.display = 'none';
//   }
// };

// formEl.addEventListener('submit', elementForSearch);
// btnMoreEl.addEventListener('click', onLoadMoreClick);