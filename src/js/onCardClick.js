import { fetchApi } from '../index.js';
import { createModalCardMarkup } from './createModalCardMarkup';

const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('[data-modal]');
let closeModalBtn = document.querySelector('[data-modal-close]');

modal.addEventListener('click', modalListener);

function modalListener(e) {
  if (
    e.path[0].className === 'modal__btn-close' ||
    e.target.classList[0] === 'modal__icon-close' ||
    e.path[0].className === 'backdrop'
  ) {
    closeModalBtn = modal.classList.add('is-hidden');
  }
}

export async function onCardClick(e) {
  if (e.path[2].className !== 'photo-card') {
    return;
  }

  if (e.path[2].className === 'photo-card') {
    modal.classList.remove('is-hidden');
    let id = e.path[2].dataset.id;
    const { data } = await fetchApi.getFilmToId(id);
    backdropBackground(data);
    modal.insertAdjacentHTML('beforeend', createModalCardMarkup(data));
  }
}

export function closeModalEcs(e) {
  if (e.code === 'Escape') {
    closeModalBtn = modal.classList.add('is-hidden');
  }
}

function backdropBackground(data) {
  backdrop.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${data.backdrop_path}`;
  backdrop.style.backgroundSize = 'cover';
  backdrop.style.backgroundPosition = '50% 50%';
}
