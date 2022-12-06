<template>
<div class="floor-view">
  <div class="floor-view__header">
    <h2 v-if="floorInfo" class="floor-view__header__title">{{floorInfo.name}}</h2>
    <button class="button">Añadir sala</button>
  </div>
  <ol
    v-if="floorInfo && floorInfo.rooms && floorInfo.rooms.length"
    class="floor-view__list">
    <li
      class="floor-view__element"
      v-for="(room, idx) in floorInfo.rooms"
      :key="`room--${idx}`">
      <Room
        :room="room">
      </Room>
    </li>
  </ol>
</div>
</template>

<script lang="ts" setup>
import Room from '@/components/room'
import {computed, onMounted} from "vue"
import {actionNames, getterNames} from "@/store"
import { useStore } from "vuex"
import { useRouter } from "vue-router"

const store = useStore()
const router = useRouter()

const floorInfo = computed(() => store.getters[getterNames.GET_FLOOR_INFO](parseInt(router.currentRoute.value.params.id as string)))

onMounted(async () => {
  await store.dispatch(actionNames.FETCH_FLOOR_INFO, parseInt(router.currentRoute.value.params.id as string))
})

</script>

<style lang="scss" scoped>
.floor-view {
  background-color: white;
  border: 1px solid $color-primary;
  border-radius: 26px;
  margin: $gap-l 0;
  padding: $gap-l;

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: $gap-l;

    &__title {

    }
  }

  @media all and (min-width: 768px) {
    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      margin: -8px;
    }

    &__element {
      padding: $gap-s;
      width: 33%;
    }
  }

  @media all and (min-width: 1024px) {

    &__element {
      width: 25%;
    }
  }
}
</style>
