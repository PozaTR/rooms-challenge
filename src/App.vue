<template>
  <div class="rooms">
    <header class="rooms__header">
      <h1 class="rooms__header__title">
        Salas
      </h1>
      <Dropdown
        :floors="floors"
        :activeFloor="activeFloorId"
        @onChangeFloor="changeFloor">
      </Dropdown>
    </header>
    <router-view/>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { actionNames, getterNames } from "@/store"
import Dropdown from '@/components/dropdown'

const activeFloorId = ref(-1)
const store = useStore()
const floors = computed(() => store.getters[getterNames.GET_FLOORS])

const router = useRouter()

let isRequesting = false

async function changeFloor(floorId: number) {
  activeFloorId.value = floorId
 if (!isRequesting) {
   try {
     isRequesting = true
     await store.dispatch(actionNames.FETCH_FLOOR_INFO, floorId)
     await router.push(`/floor/${floorId}`)
   } catch (error) {
     console.log(error)
   } finally {
     isRequesting = false
   }
 }
}

onMounted(async () => {
  await store.dispatch(actionNames.FETCH_FLOORS)
  activeFloorId.value = parseInt(router.currentRoute.value.params.id) || floors.value[0].id
  router.replace({
    name: 'FloorView',
    params: {
      id: activeFloorId.value
    }
  })
})

</script>

<style scoped lang="scss">

.rooms {
  background-color: #FFF;
  margin: 0 auto;
  max-width: 1200px;
  padding: $gap-l;

  &__header {
    border-bottom: 1px solid $color-secondary;
    padding-bottom: $gap-l;


    &__title {
      color: $color-primary;
      font-size: $font-size-l;
      font-weight: $font-weight-black;
      margin-bottom: $gap-xl;
      text-transform: capitalize;
    }
  }
}


</style>
