import axios from "axios";
import Floor from "@/types/Floor"
import FloorUI from "@/types/FloorUI"
import Room from "@/types/Room"
import getFloorsLocalMock from '@/content/getFloors.json'
import getFloorInfo1Mock from '@/content/getFloorInfo1.json'
import getFloorInfo2Mock from '@/content/getFloorInfo2.json'

const BASE_URL = 'https://apimocha.com/rooms-challenge/'

const getFloors = async (): Promise<Array<Floor>>  => {
    try {
        const { data } = await axios.get(`${BASE_URL}floors`)
        return data
    } catch (e) {
        return getFloorsLocalMock
    }
}

const getFloorInfo = async (floorId: number): Promise<FloorUI> => {
    try {
        const { data } = await axios.get(`${BASE_URL}floors/${floorId}`)
        return data
    } catch (e) {
        return floorId === 1
            ? getFloorInfo1Mock as FloorUI
            : getFloorInfo2Mock as FloorUI
    }
}

const updateRoom = async (newRoom: Room): Promise<void> => {
    const payload = {
        capacity: newRoom.capacity,
        occupancy: newRoom.occupancy
    }
    try {
        await axios.patch(`${BASE_URL}rooms/${newRoom.id}`, payload)
    } catch (e) {
        return
    }

}

const createNewRoom = async (payload: { floorId: number, newRoom: Room }): Promise<number> => {
    try {
        const { data } = await axios.post(`${BASE_URL}floors/${payload.floorId}`, payload.newRoom)
        return data.id
    } catch (e) {
        return Math.round(Math.random() * 100)
    }
}

export default {
    getFloors,
    getFloorInfo,
    updateRoom,
    createNewRoom
}
