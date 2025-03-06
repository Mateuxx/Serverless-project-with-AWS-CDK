import { jsonError } from "./Validators"


//handle a json error if the body is not a json or its bad formatted
export function parseJson(body: string) {

    try {
        return JSON.parse(body)
    } catch (error) {
        throw new jsonError(error.message);
    }
}