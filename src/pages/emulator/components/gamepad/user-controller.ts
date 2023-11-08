import { _DEFAULT_KEY_MAP, convertToValue, default_Gamepad_Mapping } from "./keys"



export class UserController {

    private static _controller: UserController = new UserController()

    private userKeyMapping: Array<Record<number | string, {
        value?: string | number
        value2?: string | number
    }>> = [{}, {}, {}, {}, {}]

    private constructor() {
        this.userKeyMapping = [{}, {}, {}, {}, {}]
        this.userKeyMapping.forEach((_, index) => {
            this.userKeyMapping[index] = convertToValue(default_Gamepad_Mapping)
        })
    }

    public static instance() {
        if (null === UserController._controller) {
            UserController._controller = new UserController()
        }
        return UserController._controller
    }

    public setUserController = (playerId: number, mapping: Record<number, {
        value?: string | number
        value2?: string | number
    }>) => this.userKeyMapping[playerId] = mapping

    public getUserController = (playerId: number) => {
        return this.userKeyMapping[playerId]
    }

    public getUserKeymap = (playerId: number) => (buttonId: number) => {
        const keymap = this.userKeyMapping[playerId]
        return keymap[buttonId]
    }
}