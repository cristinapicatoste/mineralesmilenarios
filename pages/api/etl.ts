import type { NextApiRequest, NextApiResponse } from 'next'
import {processAllMinerals} from "../../misc/data/etl";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method?.toLowerCase() === 'post') {
        await processAllMinerals();

        res.status(200).json({})

    } else {
        res.status(200).json({name: 'John Doe'})
    }
}
