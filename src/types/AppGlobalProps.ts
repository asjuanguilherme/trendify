import { ThemeName } from 'styles/themes'
import { SpotifyUserProfile } from 'services/spotify/types'

export type AppGlobalProps = {
  storedTheme?: ThemeName
  userData?: SpotifyUserProfile | null
}
