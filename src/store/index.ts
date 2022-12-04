import { createStore } from "vuex"
import floorService from "@/api/floorService"
import State from "@/types/State"
import Floor from "@/types/Floor"

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
    [actionNames.FETCH_FLOORS]: async ({ commit })  => {
      const floors = await floorService.getFloors()
      floors.forEach((floor: Floor )=> {
        commit(mutationNames.SET_FLOOR, floor)
      })
    },
    [actionNames.FETCH_FLOOR_INFO]: async ({ commit }, floorId: number) => {
      const floor = await floorService.getFloorInfo(floorId)
      console.log('selected floor----->>>>>', floor)
    }
  },
  mutations: {
    [mutationNames.SET_FLOOR]: (state: State, floor:  Floor) => {
      state.floors.push(floor)
    }
  },
  getters: {
    [getterNames.GET_FLOORS]: (state: State): Array<Floor> => state.floors
  },
  modules: {
  }
})
