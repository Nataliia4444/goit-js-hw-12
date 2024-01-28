import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

//* REFS
const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  searchBtn: document.querySelector('.search-submit '),
  loader: document.querySelector('.loader'),
  loadMore: document.querySelector('.load-more'),
};

let page = 0;
let query = '';
hide(refs.loader);
hide(refs.loadMore);

//* SUBMIT FORM
refs.form.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(e) {
  refs.gallery.innerHTML = '';

  e.preventDefault();
  show(refs.loader);
  hide(refs.loadMore);
  query = e.currentTarget.searchQuery.value.trim();
  page = 1;

  if (!query) {
    return;
  }
  try {
    //* API PIXABAY
    const resp = await getImage(query, page);

    if (resp.total === 0) {
      page = 0;
      refs.searchBtn.disabled = true;
      hide(refs.loader);
      hide(refs.loadMore);
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    //*   ADD MARKUP
    hide(refs.loader);
    refs.gallery.insertAdjacentHTML('beforeend', createMarkup(resp.hits));
    //*  CROLL SMOOTHLY
    scroll();
    show(refs.loadMore);

    //* SIMPLELIGHTBOX
    const lightbox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionPosition: 'bottom',
      captionDeloy: 250,
    });
    lightbox.on('show.simplelightbox', function (e) {
      e.preventDefault();
    });
    // lightbox.refresh();
  } catch (error) {
    console.log(error);
    hide(refs.loader);
    hide(refs.loadMore);
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
  } finally {
    refs.form.reset();
    refs.searchBtn.disabled = false;
  }
}

// //* MARKUP CARD
function createMarkup(date) {
  return date
    .map(
      ({
        downloads,
        likes,
        webformatURL,
        largeImageURL,
        tags,
        views,
        comments,
      }) => `
        <div class="product-card main">
        <div class="main">
        <a href="${largeImageURL}" >
        <img src=${webformatURL} alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p>
        </div></div>

        </div>
         `
    )
    .join('');
}

// //* API
function getImage(q, pag = 1) {
  const URL = 'https://pixabay.com/api/';
  return axios
    .get(URL, {
      params: {
        key: '39036273-6668926e4f0bebacaced31faa',
        q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: pag,
        per_page: 40,
      },
    })
    .then(response => response.data)
    .catch(error => console.log(error));
}

//* LOADMORE
refs.loadMore.addEventListener('click', handleLoadMore);
async function handleLoadMore() {
  hide(refs.loadMore);
  show(refs.loader);
  page += 1;

  try {
    const resp = await getImage(query, page);
    if (resp.totalHits < 40 * page) {
      hide(refs.loader);
      hide(refs.loadMore);
      iziToast.warning({
        message: "We're sorry, but you've reached the end of search results.",
      });
      return;
    }
    hide(refs.loader);
    refs.gallery.insertAdjacentHTML('beforeend', createMarkup(resp.hits));

    const lightbox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionPosition: 'bottom',
      captionDeloy: 250,
    });
    lightbox.refresh();

    //*  CROLL SMOOTHLY
    scroll();

    show(refs.loadMore);
  } catch (err) {
    console.log(err);
    hide(refs.loader);
    hide(refs.loadMore);
    return iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
  }
}

// //*  CROLL SMOOTHLY
function scroll() {
  const card = document.querySelector('.product-card');
  const rect = card.getBoundingClientRect();
  window.scrollBy({
    top: rect.height,
    behavior: 'smooth',
  });
}
//* HIDE BTN
function hide(el) {
  el.style.display = 'none';
}

// *SHOW BTN
function show(el) {
  el.style.display = 'block';
}
