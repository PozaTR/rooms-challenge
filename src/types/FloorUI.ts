import Room from "@/types/Room"

export default interface FloorUI {
    id: number,
    name: string,
    rooms: Array<Room>
}
