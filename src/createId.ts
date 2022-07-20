import { v4 } from "uuid";
export async function createId(obj, str: string): Promise<string> {
    let id = v4();
    while (await obj[str](id)) {
        id = v4();
    }
    return id;
}