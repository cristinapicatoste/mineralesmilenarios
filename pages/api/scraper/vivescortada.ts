import type { NextApiRequest, NextApiResponse } from 'next'
import scrapeVivesCortada from "../../../misc/data/scraper/vivescortada";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method?.toLowerCase() === 'post') {
        await scrapeVivesCortada();

        res.status(200).json({})

    } else {
        res.status(200).json({name: 'John Doe'})
    }
}
