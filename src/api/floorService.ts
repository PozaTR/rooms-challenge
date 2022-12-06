import axios from "axios";
import Floor from "@/types/Floor"
import FloorUI from "@/types/FloorUI"

const BASE_URL = 'https://apimocha.com/rooms-challenge/'

const getFloors = async (): Promise<Array<Floor>>  => {
    const { data } = await axios.get(`${BASE_URL}floors`)
    return data
}

const getFloorInfo = async (floorId: number): Promise<FloorUI> => {
    const { data } = await axios.get(`${BASE_URL}floors/${floorId}`)
    return data
}

export default {
    getFloors,
    getFloorInfo
}