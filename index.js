import{a as b,S as v,i as u}from"./assets/vendor-Dp7Ig4E2.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const S="46087000-8dffe905d5bdd270a8d626623",w="https://pixabay.com/api/",h=15;async function p(a,r=1){const t=new URLSearchParams({q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:h,page:r}),i=await b.get(`${w}?key=${S}&${t}`),{data:{hits:e,totalHits:s}}=i;return{hits:e,totalHits:s}}function f(a){return a.map(({webformatURL:r,largeImageURL:t,tags:i,likes:e,views:s,comments:l,downloads:L})=>`<li class="gallery-list">
                    <a class="gallery-link" href="${t}">
                        <img class="img" src="${r}" 
                        alt="${i}" 
                        title="${i}" />
                    </a>
                    <ul class="data-list">
                        <li class="data-item">
                            <p class="data-name">Likes</p>
                            <p class="data-result">${e}</p>
                        </li>
                        <li class="data-item">
                            <p class="data-name">Views</p>
                            <p class="data-result">${s}</p>
                        </li>
                        <li class="data-item">
                            <p class="data-name">Comments</p>
                            <p class="data-result">${l}</p>
                        </li>
                        <li class="data-item">
                            <p class="data-name">Downloads</p>
                            <p class="data-result">${L}</p>
                        </li>
                    </ul> 
        </li>`).join("")}const g=document.querySelector(".form"),c=document.querySelector(".gallery"),d=document.querySelector(".loader"),o=document.querySelector(".btn-more");let y=new v(".gallery a",{});g.addEventListener("submit",E);o.addEventListener("click",P);let n=1,m="";async function E(a){a.preventDefault();const r=a.target.elements.query.value.trim();if(m=r,n=1,c.innerHTML="",o.classList.remove("is-hidden"),!r){u.error({message:"Please enter a search word",position:"topRight"}),o.classList.add("is-hidden");return}d.classList.add("is-hidden");try{const{hits:t}=await p(m,n);if(!t||t.length===0){u.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}t.length<h?o.classList.remove("is-hidden"):o.classList.add("is-hidden");const i=f(t);c.insertAdjacentHTML("beforeend",i),y.refresh()}catch(t){console.log(t.message)}finally{d.classList.remove("is-visible"),g.reset()}}async function P(){n+=1;try{d.classList.add("is-hidden"),o.classList.remove("is-hidden");const{hits:a,totalHits:r}=await p(m,n),t=f(a);if(c.insertAdjacentHTML("beforeend",t),y.refresh(),$(),n>Math.ceil(r/h)-1){o.classList.remove("is-hidden"),u.error({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}o.classList.add("is-hidden")}catch(a){console.log(a.message)}finally{d.classList.remove("is-hidden")}}function $(){const t=c.querySelector("li").getBoundingClientRect().height*2+140;window.scrollBy({top:t,left:0,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
