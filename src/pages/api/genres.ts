import { NextApiHandler } from 'next'
import { getMyTopGenres } from 'services/spotify/queries/getMyTopGenres'

const handler: NextApiHandler = async (req, res) => {
  try {
    const token = req.query.token as string
    const timeRange = req.query.timeRange as 'lastMonth'
    const limit = req.query.limit as unknown as number

    const data = await getMyTopGenres({ limit, timeRange, accessToken: token })

    res.status(200).send(data)
  } catch (err) {
    console.log(err)
    res.status(401)
  }
}

export default handler
