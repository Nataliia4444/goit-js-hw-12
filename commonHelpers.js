import{i as u,S as m,a as b}from"./assets/vendor-b88abdf8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();const e={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),searchBtn:document.querySelector(".search-submit "),loader:document.querySelector(".loader"),loadMore:document.querySelector(".load-more")};let l=0,d="";a(e.loader);a(e.loadMore);e.form.addEventListener("submit",M);async function M(r){if(e.gallery.innerHTML="",r.preventDefault(),f(e.loader),a(e.loadMore),d=r.currentTarget.searchQuery.value.trim(),l=1,!!d)try{const t=await h(d,l);if(t.total===0){l=0,e.searchBtn.disabled=!0,a(e.loader),a(e.loadMore),u.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}a(e.loader),e.gallery.insertAdjacentHTML("beforeend",y(t.hits)),p(),f(e.loadMore),new m(".gallery a",{captions:!0,captionsData:"alt",captionPosition:"bottom",captionDeloy:250}).on("show.simplelightbox",function(i){i.preventDefault()})}catch(t){console.log(t),a(e.loader),a(e.loadMore),u.error({message:"Sorry, there are no images matching your search query. Please try again!"})}finally{e.form.reset(),e.searchBtn.disabled=!1}}function y(r){return r.map(({downloads:t,likes:s,webformatURL:i,largeImageURL:o,tags:n,views:c,comments:g})=>`
        <div class="product-card main">
        <div class="main">
        <a href="${o}" >
        <img src=${i} alt="${n}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes: ${s}</b>
          </p>
          <p class="info-item">
            <b>Views: ${c}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${g}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${t}</b>
          </p>
        </div></div>

        </div>
         `).join("")}function h(r,t=1){const s="https://pixabay.com/api/";return b.get(s,{params:{key:"39036273-6668926e4f0bebacaced31faa",q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:40}}).then(i=>i.data).catch(i=>console.log(i))}e.loadMore.addEventListener("click",v);async function v(){a(e.loadMore),f(e.loader),l+=1;try{const r=await h(d,l);if(r.totalHits<40*l){a(e.loader),a(e.loadMore),u.warning({message:"We're sorry, but you've reached the end of search results."});return}a(e.loader),e.gallery.insertAdjacentHTML("beforeend",y(r.hits)),new m(".gallery a",{captions:!0,captionsData:"alt",captionPosition:"bottom",captionDeloy:250}).refresh(),p(),f(e.loadMore)}catch(r){return console.log(r),a(e.loader),a(e.loadMore),u.error({message:"Sorry, there are no images matching your search query. Please try again!"})}}function p(){const t=document.querySelector(".product-card").getBoundingClientRect();window.scrollBy({top:t.height,behavior:"smooth"})}function a(r){r.style.display="none"}function f(r){r.style.display="block"}
//# sourceMappingURL=commonHelpers.js.map
