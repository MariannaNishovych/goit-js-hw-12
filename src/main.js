'use strict';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import "izitoast/dist/css/iziToast.min.css";
import iziToast from "izitoast";

import { fetchImages } from "./js/pixabay-api";
import { createMarkup } from "./js/render-functions";

const refs = {
    form: document.querySelector('.form'),
    gallery: document.querySelector('.gallery'),
    loader: document.querySelector('.loader'),
    btnMore: document.querySelector('.btn-more'),
};

console.log(refs)

let galleryBox = new SimpleLightbox('.gallery a', {  
    caption: true,  
    captionDelay: 250,  
    captionsData: 'alt',  
});  