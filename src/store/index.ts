import { createStore } from 'vuex'
import floorService from '@/api/floorService'

export const actionNames = {
  FETCH_FLOORS: 'fetch_floor',
  FETCH_FLOOR_INFO: 'fetch_floor_info',
  CREATE_ROOM: 'create_room',
  PATCH_ROOM: 'patch_room',
}

export const mutationNames = {
  SET_FLOOR: 'set_floor',
  ADD_ROOM_INTO_FLOOR: 'add_room_into_floor',
  UPDATE_ROOM: 'update_room',
}

export const getterNames = {
  GET_FLOORS: 'get_floor',
  GET_ROOM_IN_FLOOR: 'get_room_in_floor'
}


export default createStore({
  state: {
    floors: [],
    rooms: []
  },
  actions: {
    [actionNames.FETCH_FLOORS]: async () => {
      const floors = await floorService.getFloors()
      console.log('floors', floors)
      return floors
    }
  },
  mutations: {
  },
  modules: {
  }
})
