<template>
  <div class="room">
    <h3 class="room__title">{{props.room.name}}</h3>
    <form>
      <div class="room__field">
        <label class="room__field__label" for="capacity">Capacidad máxima</label>
        <input class="room__field__input" type="text" id="capacity" name="capacity" v-model="capacity">
      </div>
      <div class="room__field">
        <label class="room__field__label" for="occupancy">Ocupación</label>
        <div class="room__field__input room__field__input--occupancy">
          <input type="text" id="occupancy" name="occupancy" v-model="occupancy">
          <span>%</span>
        </div>

      </div>
      <div class="room__button">
        <button type="button" class="button" @click="changeRoom">Modificar</button>
      </div>
    </form>

  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, defineEmits, watchEffect, ref } from 'vue'
import Room from "@/types/Room";

const props = defineProps({
  room: {
    type: Object,
    default: () => ({}),
    required: true
  }
})

const capacity = ref(0)
const occupancy = ref(0)

const emit = defineEmits<{
  (e: 'updateRoom', payload: Room): void
}>()

watchEffect(() => {
  capacity.value = props.room.capacity
  occupancy.value = props.room.occupancy * 100
})

function changeRoom() {
  emit('updateRoom', {
    ...props.room,
    capacity: capacity.value,
    occupancy: occupancy.value / 100,
  })
}

</script>

<style scoped lang="scss">

.room {
  background-color: $color-secondary;
  border-radius: 26px;
  height: 100%;
  margin-bottom: $gap-xl;
  padding: $gap-l;

  &__title {
    color: $color-primary;
    font-size: $font-size-m;
    font-weight: $font-weight-bold;
    margin-bottom: $gap-l;
  }

  &__field {
    display: flex;
    flex-direction: column;
    font-size: $font-size-s;
    margin-bottom: $gap-l;

    &__label {
      color: $color-primary;
      font-weight: $font-weight-bold;
      margin-bottom: $gap-s;
    }

    &__input {
      border: 1px solid $color-primary;
      border-radius: 12px;
      padding: $gap-s $gap-m;

      &--occupancy {
        display: flex;
        justify-content: space-between;
      }
    }
  }

  &__button {
    display: flex;
    justify-content: right;
  }
}

</style>
