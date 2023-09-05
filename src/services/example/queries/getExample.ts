import { exampleClient } from '../config'
import { ExampleDTO } from '../types'

const getExample = async () => {
  try {
    const { data } = await exampleClient<ExampleDTO>('/example')
    return data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export default getExample
