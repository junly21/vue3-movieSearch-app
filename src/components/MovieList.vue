<script setup lang="ts">
import type { Movie } from '../api/api'
import { fetchDetail } from '../api/api'
interface Props {
  movies: Movie[] | null
}

defineProps<Props>()

const findParent = ($: HTMLElement): HTMLElement => {
  if ($.classList.contains('movie')) {
    return $
  }

  return findParent($.parentElement as HTMLElement)
}

const openDetail = async (e: MouseEvent) => {
  const $ = findParent(e.target as HTMLElement)
  const { id } = $.dataset
  // TODO: 상세 페이지 표시
  const plot = await fetchDetail(id as string)
  openModal(plot)
}

const openModal = (plot: string) => {
  const $modal = document.querySelector('.modal') as HTMLElement
  $modal.style.display = 'block'
  const $modal_plot = document.querySelector('.modal_plot') as HTMLElement
  $modal_plot.innerHTML = `<h1>${plot}</h1>`
}

const closeModal = () => {
  const $modal = document.querySelector('.modal') as HTMLElement
  $modal.style.display = 'none'
}
</script>

<template>
  <div class="modal" @click="closeModal">
    <div class="modal_plot"></div>
  </div>
  <div v-if="!movies">
    <div class="bono">
      <img class="bono_img" src="../img/bono.png" alt="" />
    </div>
  </div>
  <div v-else-if="movies.length === 0">검색 결과가 없습니다!</div>
  <div v-else class="movies" @click="openDetail">
    <div
      v-for="movie in movies"
      :key="movie.imdbID"
      :data-id="movie.imdbID"
      class="movie">
      <div class="movie__description">
        <h3 class="movie__title">{{ movie.title }}</h3>
        <span class="movie__year">{{ movie.year }}</span>
      </div>
      <img class="movie__poster" :src="movie.poster" />
    </div>
  </div>
</template>
