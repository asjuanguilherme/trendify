import * as S from './styles'
import { MutableRefObject, useMemo } from 'react'

// Types
import { SpotifyUserProfile } from 'services/spotify/types'
import { SpotifyArtist } from 'services/spotify/types/Artist'
import { SpotifyTrack } from 'services/spotify/types/Track'

// Utils
import { WEBSITE_URL } from 'config/websiteUrl'

// Components
import TrackItem, { TrackItemStyle } from '../TrackItem'
import Logo from '../Logo'
import UserIcon from '../icons/User'
import TriangleExclamationIcon from '../icons/TriangleExclamation'
import Spinner from '../Spinner'
import { TimeRange, topItemsGeneratorConfig } from 'config/topItemsGenerator'
import SpotifyLogo from 'components/shared/SpotifyLogo'
import CalendarIcon from '../icons/Calendar'

export type UserTopItemsBoxProps = {
  boxRef?: MutableRefObject<HTMLDivElement | null>
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
  enableBadgeHightlights: boolean
  loading: boolean
  titleType: 'short' | 'large'
  roundedCorners: boolean
}

const trackItemsSizeByLimit = {
  3: 'large',
  5: 'medium',
  10: 'small'
}

const UserTopItemsBox = ({
  boxRef,
  type,
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
  selectedItemsStyle,
  enableBadgeHightlights,
  loading,
  titleType,
  roundedCorners
}: UserTopItemsBoxProps) => {
  if (!trackItems && !artistItems)
    throw new Error('You must define trackItems or artistItems prop.')

  const backgroundImage = (() => {
    if (type === 'tracks' && trackItems && trackItems.length > 0)
      return trackItems![0].album.images[0].url

    if (type === 'artists' && artistItems && artistItems.length > 0)
      return artistItems![0].images[0].url

    return '/assets/images/photo_placeholder.png'
  })()

  if (
    (type == 'tracks' && (!trackItems || trackItems.length === 0)) ||
    (type == 'artists' && (!artistItems || artistItems.length === 0))
  )
    return (
      <S.Empty>
        <TriangleExclamationIcon />
        <S.EmptyText>
          Não encontramos dados suficientes para gerar seu sTopify. Ouça músicas
          e volte depois.
        </S.EmptyText>
      </S.Empty>
    )

  return (
    <S.Wrapper
      ref={boxRef}
      $color={color}
      $enableGradient={enableGradient}
      $roundedCorners={roundedCorners}
    >
      {loading && (
        <S.LoadingWrapper>
          <Spinner size="large" />
        </S.LoadingWrapper>
      )}

      <>
        {enableBackgroundImage && (
          <S.GeneratedBoxImage src={backgroundImage} $enableBlur={enableBlur} />
        )}
        <S.Header>
          {showProfileInfo && (
            <S.SpotifyInfo>
              <S.SpotifyInfoProfile>
                {userData.images[0] ? (
                  <S.SpotifyInfoProfileImage
                    src={userData.images[0]?.url}
                    alt=""
                  />
                ) : (
                  <S.SpotifyInfoProfileImagePlaceholder>
                    <UserIcon />
                  </S.SpotifyInfoProfileImagePlaceholder>
                )}
                <S.SpotifyInfoProfileName>
                  {userData.display_name}
                </S.SpotifyInfoProfileName>
              </S.SpotifyInfoProfile>
            </S.SpotifyInfo>
          )}
          <S.Title>
            {topItemsGeneratorConfig.timeOptions[timeRange].text.tracks[
              titleType
            ].replace('{{limit}}', limit + '')}
          </S.Title>
          <S.HeaderInfoRow>
            <SpotifyLogo />
            <S.HeaderInfoRowItem>
              <CalendarIcon size=".875rem" />
              {new Intl.DateTimeFormat('pt-BR', {
                dateStyle: 'full'
              }).format(new Date())}
            </S.HeaderInfoRowItem>
          </S.HeaderInfoRow>
        </S.Header>
        <S.Main>
          <S.ItemsList
            $style={selectedItemsStyle}
            $backgroundColor={color}
            $itemsLength={trackItems?.length}
          >
            {trackItems &&
              trackItems.length > 0 &&
              trackItems.map((item, index) => (
                <li key={item.id}>
                  <TrackItem
                    itemsBoxColor={color}
                    badgeNumber={
                      enableBadgeHightlights
                        ? index > 2
                          ? undefined
                          : index + 1
                        : undefined
                    }
                    data={item}
                    size={trackItemsSizeByLimit[limit as 3] as 'small'}
                    style={selectedItemsStyle}
                  />
                </li>
              ))}
          </S.ItemsList>
        </S.Main>
        <S.Footer>
          <S.CreatedByText $itemsBoxColor={color}>
            <Logo />
          </S.CreatedByText>
          <S.CreatedByLink>
            Acesse {new URL(WEBSITE_URL).hostname}
          </S.CreatedByLink>
        </S.Footer>
      </>
    </S.Wrapper>
  )
}

export default UserTopItemsBox
