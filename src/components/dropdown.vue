<template>
  <div class="dropdown">
    <div
      :class="[
        'dropdown__selected',
        {'dropdown__selected--active': isDropdownOpen}
      ]"
      @click="toogleDropdown">
      <p class="dropdown__selected__text">{{activeFloorName}}</p>
      <img
        src="../assets/images/arrow.svg"
        alt="Flecha"
        :class="[
          'dropdown__selected__arrow',
          {'dropdown__selected__arrow--active': isDropdownOpen}
        ]">
    </div>
    <transition name="appear" appear>
      <ol
        v-if="isDropdownOpen"
        class="dropdown__list">
        <li
            v-for="(floor, idx) in props.floors"
            :key="`floor--${idx}`"
            class="dropdown__list__element"
            @click="changeSelection(floor.id)">
          {{floor.name}}
        </li>
      </ol>
    </transition>
    
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType, defineProps, defineEmits, computed } from 'vue'
import Floor from "@/types/Floor"

const props = defineProps({
  floors: {
    type: Array as PropType<Array<Floor>>,
    default: () => ([]),
    required: true
  },
  activeFloor: {
    type: Number,
    default: -1,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'onChangeFloor', id: number): void
}>()

const isDropdownOpen = ref(false)

const activeFloorName = computed(() => {
  const floor = props.floors.find(floor => floor.id === props.activeFloor)
  return floor
      ? floor.name
      : ''
})

function toogleDropdown():void {
  isDropdownOpen.value = !isDropdownOpen.value
}

function changeSelection(id: number):void {
  emit('onChangeFloor', id)
  isDropdownOpen.value = false
}

</script>

<style scoped lang="scss">
$animationLength: .2s;

.dropdown {
  &__selected {
    align-items: center;
    background-color: white;
    border: 1px solid $color-primary;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    transition: border-bottom-right-radius $animationLength, border-bottom-left-radius $animationLength;
    padding: $gap-s $gap-m;
    position: relative;
    width: 100%;
    z-index: 1;

    &--active {
      border-bottom-right-radius: 0px;
      border-bottom-left-radius: 0px;
    }

    &__text {
      color: $color-primary;
      font-size: $font-size-s;
      width: 100%;
    }

    &__arrow {
      &--active {
        transition: all $animationLength ease;
        transform: rotate(180deg);
      }
    }
  }

  &__list {
    border: 1px solid $color-primary;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    border-top-color: transparent;
    color: $color-primary;
    padding: $gap-s $gap-m;
    width: 100%;

    &__element {
      font-size: $font-size-s;
      padding: $gap-xs 0;
    }
  }

  @media all and (min-width: 768px) {
    &__selected {
      max-width: 180px;
    }

    &__list {
      max-width: 180px;
    }
  }
}

@keyframes show {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.appear-enter-active {
  animation-name: show;
  animation-duration: $animationLength;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
}
.appear-leave-active {
  animation-name: show;
  animation-duration: $animationLength;
  animation-direction: reverse;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
}

</style>
