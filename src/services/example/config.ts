import axios from 'axios'
import throwEnvError from 'utils/throwEnvError'

export const EXAMPLE_SERVICE_API_URL =
  process.env.NEXT_PUBLIC_EXAMPLE_SERVICE_API_URL

if (!EXAMPLE_SERVICE_API_URL) throwEnvError('EXAMPLE_SERVICE_API_URL')

export const exampleClient = axios.create({
  baseURL: EXAMPLE_SERVICE_API_URL
})
