<template>
<div class="floor-view">
  <div class="floor-view__header">
    <h2
      v-if="floorInfo"
      class="floor-view__header__title">
      {{floorInfo.name}}
    </h2>
    <button
      :class="[
        'button',
        'button-primary',
        {'button--disabled': isEditing}
      ]"
      @click="addNewRoom">
      Añadir sala
    </button>
  </div>
  <ol
    v-if="floorInfo && floorInfo.rooms && floorInfo.rooms.length"
    class="floor-view__list">
    <li
      class="floor-view__element"
      v-for="(room, idx) in floorInfo.rooms"
      :key="`room--${idx}`">
      <Room
        :room="room"
        @updateRoom="updateRoom">
      </Room>
    </li>
    <li v-if="isEditing" class="floor-view__element">
      <Room
        :room="newRoom"
        :isEditing="isEditing"
        @addNewRoom="createNewRoom"
        @cancelEdition="cancelEdition"
      ></Room>
    </li>
  </ol>
</div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import Room from "@/components/room"
import { actionNames, getterNames } from "@/store"

const store = useStore()
const router = useRouter()

let isEditing = ref(false)
const newRoom = {
  name: '',
  capacity: 0,
  occupancy: 0
}

const floorInfo = computed(() => store.getters[getterNames.GET_FLOOR_INFO](parseInt(router.currentRoute.value.params.id as string)))

async function updateRoom(roomInfo: Room): Promise<void> {
  await store.dispatch(actionNames.PATCH_ROOM, roomInfo)
}

function addNewRoom():void {
  isEditing.value = true
}

async function createNewRoom(room: Room): Promise<void> {
  await store.dispatch(actionNames.CREATE_ROOM, { floorId: floorInfo.value.id, newRoom: room })
  cancelEdition()
}

function cancelEdition():void {
  isEditing.value = false
}

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
      text-transform: capitalize;
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
