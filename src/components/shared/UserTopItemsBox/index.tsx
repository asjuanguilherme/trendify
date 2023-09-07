import * as S from './styles'
import { MutableRefObject, useMemo } from 'react'

// Types
import { SpotifyUserProfile } from 'services/spotify/types'
import { SpotifyArtist } from 'services/spotify/types/Artist'
import { SpotifyTrack } from 'services/spotify/types/Track'
import { TimeRange } from 'services/spotify/queries/getMyTopArtists'

// Utils
import { timeRangeOptions } from './utils'

// Components
import TrackItem, { TrackItemStyle } from '../TrackItem'
import Logo from '../Logo'

export type UserTopItemsBoxProps = {
  boxRef: MutableRefObject<HTMLDivElement | null>
  trackItems?: SpotifyTrack[]
  artistItems?: SpotifyArtist[]
  type: 'artists' | 'tracks'
  color: string
  limit: number
  enableGradient: boolean
  enableBlur: boolean
  enableBackgroundImage: boolean
  showProfileInfo: boolean
  userData: SpotifyUserProfile
  selectedItemsStyle: TrackItemStyle
  timeRange: TimeRange
}

const trackItemsSizeByLimit = {
  3: 'large',
  5: 'medium',
  10: 'small'
}

const UserTopItemsBox = ({
  boxRef,
  color,
  limit,
  enableBlur,
  enableGradient,
  enableBackgroundImage,
  showProfileInfo,
  userData,
  trackItems,
  artistItems,
  timeRange,
  selectedItemsStyle
}: UserTopItemsBoxProps) => {
  if (!trackItems && !artistItems)
    throw new Error('You must define trackItems or artistItems prop.')

  const backgroundImage = trackItems
    ? trackItems![0].album.images[0].url
    : artistItems![0].images[0].url

  const titleSufix = useMemo(() => {
    return timeRangeOptions.filter(item => item.value === timeRange)[0]
      .generatedText
  }, [timeRange])

  return (
    <S.Wrapper
      ref={boxRef}
      $color={color}
      $enableGradient={enableGradient}
      $enableBlur={enableBlur}
    >
      <>
        {enableBackgroundImage && (
          <S.GeneratedBoxImage $src={backgroundImage} />
        )}
        {showProfileInfo && (
          <S.Profile>
            <S.ProfileImage src={userData.images[0].url} alt="" />
            <S.ProfileName>{userData.display_name}</S.ProfileName>
          </S.Profile>
        )}
        <S.Title>
          Top {limit} {titleSufix}
        </S.Title>
        <S.Date>
          {new Intl.DateTimeFormat('pt-BR', {
            dateStyle: 'long'
          }).format(new Date())}
        </S.Date>
        <S.ItemsList $style={selectedItemsStyle}>
          {trackItems &&
            trackItems.length > 0 &&
            trackItems.map(item => (
              <li key={item.id}>
                <TrackItem
                  data={item}
                  size={trackItemsSizeByLimit[limit as 3] as 'small'}
                  style={selectedItemsStyle}
                />
              </li>
            ))}
        </S.ItemsList>
        <S.CreatedBy>
          Criado em <Logo />
        </S.CreatedBy>
      </>
    </S.Wrapper>
  )
}

export default UserTopItemsBox
