import axios from "axios";

const BASE_URL = 'https://apimocha.com/rooms-challenge/'

const getFloors = async () => {
    return await axios.get(`${BASE_URL}floors`)
}

const getFloorInfo = async (floorId: number) => {
    return await axios.get(`${BASE_URL}floors/${floorId}`)
}

export default {
    getFloors,
    getFloorInfo
}
