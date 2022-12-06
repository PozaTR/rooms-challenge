import axios from "axios";
import Floor from "@/types/Floor"
import FloorUI from "@/types/FloorUI"
import Room from "@/types/Room"

const BASE_URL = 'https://apimocha.com/rooms-challenge/'

const getFloors = async (): Promise<Array<Floor>>  => {
    const { data } = await axios.get(`${BASE_URL}floors`)
    return data
}

const getFloorInfo = async (floorId: number): Promise<FloorUI> => {
    const { data } = await axios.get(`${BASE_URL}floors/${floorId}`)
    return data
}

const updateRoom = async (newRoom: Room) => {
    const payload = {
        capacity: newRoom.capacity,
        occupancy: newRoom.occupancy
    }
    await axios.patch(`${BASE_URL}rooms/${newRoom.id}`, payload)
}

const createNewRoom = async (payload: { floorId: number, newRoom: Room }): Promise<number> => {
    const { data } = await axios.post(`${BASE_URL}floors/${payload.floorId}`, payload.newRoom)
    return data.id
}

export default {
    getFloors,
    getFloorInfo,
    updateRoom,
    createNewRoom
}
