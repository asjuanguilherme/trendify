export const throwEnvError = (envName: string) => {
  throw new Error(`You must define a value for: ${envName}`)
}
