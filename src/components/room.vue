<template>
  <div class="room">
    <div
      v-if="props.isEditing"
      class="room__field">
      <label
        class="room__field__label"
        for="name">Nombre de la sala
      </label>
      <input
        class="room__field__input"
        type="text"
        id="name"
        name="name"
        v-model="name">
    </div>
    <h3
      v-else
      class="room__title">
      {{props.room.name}}
    </h3>
    <form>
      <div class="room__field">
        <label
          class="room__field__label"
          for="capacity">
          Capacidad máxima
        </label>
        <input
          class="room__field__input"
          type="number"
          id="capacity"
          name="capacity"
          v-model="capacity">
      </div>
      <div class="room__field">
        <label
          class="room__field__label"
          for="occupancy">Ocupación</label>
        <div
          class="room__field__input room__field__input--occupancy">
          <input
            type="number"
            id="occupancy"
            name="occupancy"
            v-model="occupancy">
          <span>%</span>
        </div>
      </div>
      <div class="room__button__wrapper">
        <template
            v-if="props.isEditing">
          <button
              type="button"
              class="button button-primary room__button"
              @click="addNewRoom">Añadir
          </button>
          <button
              type="button"
              class="button button-secondary room__button"
              @click="cancelEdition">Cancelar
          </button>
        </template>
        <button
            v-else
            class="button button-primary room__button"
            type="button"
            @click="changeRoom">Modificar
        </button>
      </div>
    </form>

  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, watchEffect, ref } from 'vue'
import Room from "@/types/Room";

const props = defineProps({
  room: {
    type: Room,
    default: () => ({}),
    required: true
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})


const name = ref('')
const capacity = ref(0)
const occupancy = ref(0)

const emit = defineEmits<{
  (e: 'updateRoom', payload: Room): void,
  (e: 'addNewRoom', payload: Omit<Room, 'id'>): void,
  (e: 'cancelEdition'): void
}>()

watchEffect(() => {
  name.value = props.room.name
  capacity.value = props.room.capacity
  occupancy.value = props.room.occupancy * 100
})

function changeRoom():void {
  emit('updateRoom', {
    ...props.room,
    capacity: capacity.value,
    occupancy: occupancy.value / 100,
  })
}

function addNewRoom():void {
  emit('addNewRoom', {
    name: name.value,
    capacity: capacity.value,
    occupancy: occupancy.value / 100
  })
}

function cancelEdition(): void {
  emit('cancelEdition')

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
    text-transform: capitalize;
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
    &+& {
      margin-left: $gap-s;
    }
    &__wrapper {
      display: flex;
      justify-content: right;
    }
  }
}

</style>
