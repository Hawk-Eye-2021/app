import {Request, Response} from "express";


export function handled(fn: (req: Request, res: Response) => Promise<void>) {
    return (req: Request, res: Response) => {
        fn(req, res)
            .catch(e => {
                if (e instanceof APIError) {
                    return res.status(e.status).send(e.message)
                } else {
                    console.error(e)
                    return res.status(500).send('unknown error')
                }
            })
    }
}

export class APIError implements APIError {


    constructor(status: number, message?: string) {
        this.status = status;
        this.message = message;
    }

    public readonly status!: number;
    public readonly message?: string

}