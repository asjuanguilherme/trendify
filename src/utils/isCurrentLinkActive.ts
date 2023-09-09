export const isCurrentLinkActive = (path: string, asPath: string) => {
  const cleanedAsPath = asPath.split('?')[0]

  if (path === '/generator' && cleanedAsPath === '/') return true

  if (path === '/') return path === cleanedAsPath

  return path === asPath
}

export default isCurrentLinkActive
