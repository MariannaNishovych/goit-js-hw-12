'use strict';

export function createMarkup(data, gallery) {
    const markup = data.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
    }) => {
        return `<li class="gallery-list">
                    <a class="gallery-link" href="${largeImageURL}">
                        <img class="img" src="${webformatURL}" 
                        alt="${tags}" 
                        title="${tags}" />
                    </a>
                    <ul class="data-list">
                        <li class="data-item">
                            <p class="data-name">Likes</p>
                            <p class="data-result">${likes}</p>
                        </li>
                        <li class="data-item">
                            <p class="data-name">Views</p>
                            <p class="data-result">${views}</p>
                        </li>
                        <li class="data-item">
                            <p class="data-name">Comments</p>
                            <p class="data-result">${comments}</p>
                        </li>
                        <li class="data-item">
                            <p class="data-name">Downloads</p>
                            <p class="data-result">${downloads}</p>
                        </li>
                    </ul> 
        </li>`;
    }).join("");
    
    gallery.insertAdjacentHTML("beforeend", markup);
};