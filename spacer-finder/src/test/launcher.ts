import { handler } from "../service/spaces/handler";

handler({
    httpMethod: 'GET',
    body: JSON.stringify({
        location: "London"
    })

} as any, {} as any);
