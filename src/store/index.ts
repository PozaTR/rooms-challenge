import { createStore } from "vuex"
import floorService from "@/api/floorService"
import State from "@/types/State"
import Floor from "@/types/Floor"
import Room from "@/types/Room"
import FloorUI from "@/types/FloorUI"

export const actionNames = {
  FETCH_FLOORS: 'fetch_floor',
  FETCH_FLOOR_INFO: 'fetch_floor_info',
  PATCH_ROOM: 'patch_room',
  CREATE_ROOM: 'create_room'
}

export const mutationNames = {
  SET_FLOOR: 'set_floor',
  ADD_ROOM_INTO_FLOOR: 'add_room_into_floor',
  UPDATE_ROOM: 'update_room',
}

export const getterNames = {
  GET_FLOORS: 'get_floor',
  GET_FLOOR_INFO: 'get_floor_info'
}


export default createStore<State>({
  state: {
    floors: [],
    rooms: []
  },
  actions: {
    [actionNames.FETCH_FLOORS]: async ({ commit, state }) => {
      const floors = await floorService.getFloors()
      floors.forEach((floor: Floor) => {
        const floorIdx = state.floors.findIndex(_floor => _floor.id === floor.id)
        if (floorIdx < 0) {
          commit(mutationNames.SET_FLOOR, floor)
        }
      })
    },
    [actionNames.FETCH_FLOOR_INFO]: async ({ commit, state }, floorId: number) => {
      const floor = await floorService.getFloorInfo(floorId)
      const floorIdx = state.floors.findIndex(floor => floor.id === floorId)

      const { rooms, ..._floor } = floor
      if (floorIdx < 0) {
        commit(mutationNames.SET_FLOOR, _floor)
      }

      rooms.forEach(room => {
        commit(mutationNames.ADD_ROOM_INTO_FLOOR, { floorId: floor.id, room })
      })
    },
    [actionNames.PATCH_ROOM]: async ({ commit }, newRoom: Room) => {
      await floorService.updateRoom(newRoom)
      commit(mutationNames.UPDATE_ROOM, newRoom)
    },
    [actionNames.CREATE_ROOM]: async ({ commit }, payload: { floorId: number, newRoom: Room }) => {
      const id = await floorService.createNewRoom(payload)
      const room = {
        ...payload.newRoom,
        id
      }
      commit(mutationNames.ADD_ROOM_INTO_FLOOR, { floorId: payload.floorId, room })
    }
  },
  mutations: {
    [mutationNames.SET_FLOOR]: (state: State, floor:  Floor):void => {
      state.floors.push(floor)
    },
    [mutationNames.ADD_ROOM_INTO_FLOOR]: (state: State, payload: { floorId: number, room: Room }):void => {
      const activeFloorIdx = state.floors.findIndex(floor => floor.id === payload.floorId)
      if (state.floors[activeFloorIdx].rooms) {
        const roomIdx = state.floors[activeFloorIdx].rooms?.findIndex(_room => _room === payload.room.id)
        if (typeof roomIdx === 'undefined' || roomIdx < 0) {
          state.rooms.push(payload.room)
          state.floors[activeFloorIdx].rooms?.push(payload.room.id)
        } else {
          state.rooms[roomIdx] = payload.room
        }
      } else {
        state.floors[activeFloorIdx].rooms = [payload.room.id]
        state.rooms.push(payload.room)
      }
    },
    [mutationNames.UPDATE_ROOM]: (state: State, newRoom: Room): void => {
      const roomIdx = state.rooms.findIndex(room => room.id === newRoom.id)
      state.rooms[roomIdx] = newRoom
    }
  },
  getters: {
    [getterNames.GET_FLOORS]: (state: State): Array<Floor> => state.floors,
    [getterNames.GET_FLOOR_INFO]: (state: State) => (activeFloorId: number): FloorUI | null => {
      const activeFloorIdx = state.floors.findIndex(floor => floor.id === activeFloorId)
      return activeFloorIdx >= 0
        ? {
            ...state.floors[activeFloorIdx],
            rooms: state.floors[activeFloorIdx]
                .rooms?.reduce((acc, roomId) => {
                    const room = state.rooms.find(room => room.id === roomId)
                      if (room) {
                        acc.push(room)
                      }
                      return acc
                    }
                  , [] as Array<Room>)
                || []
          }
        : null
    }
  },
  modules: {
  }
})
