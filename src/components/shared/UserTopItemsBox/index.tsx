import * as S from './styles'
import { MutableRefObject, useMemo } from 'react'

// Types
import { SpotifyUserProfile } from 'services/spotify/types'
import { SpotifyArtist } from 'services/spotify/types/Artist'
import { SpotifyTrack } from 'services/spotify/types/Track'

// Utils
import { WEBSITE_URL } from 'config/websiteUrl'
import { useLocale } from 'hooks/useLocale'
import { useI18n } from 'hooks/useI18n'

// Components
import TrackItem, { TrackItemStyle } from '../TrackItem'
import Logo from '../Logo'
import UserIcon from '../icons/User'
import TriangleExclamationIcon from '../icons/TriangleExclamation'
import Spinner from '../Spinner'
import { GeneratorType, TimeRange } from 'config/topItemsGenerator'
import SpotifyLogo from 'components/shared/SpotifyLogo'
import CalendarIcon from '../icons/Calendar'
import { GlobalTrackItem } from 'types/TrackItem'

export type UserTopItemsBoxProps = {
  boxRef?: MutableRefObject<HTMLDivElement | null>
  type: GeneratorType
  trackItems?: GlobalTrackItem[]
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
  color,
  limit,
  enableBlur,
  enableGradient,
  enableBackgroundImage,
  showProfileInfo,
  userData,
  trackItems,
  timeRange,
  selectedItemsStyle,
  enableBadgeHightlights,
  loading,
  titleType,
  roundedCorners,
  type
}: UserTopItemsBoxProps) => {
  const locale = useLocale()
  const i18n = useI18n()

  const backgroundImage = (() => {
    if (trackItems && trackItems.length > 0) return trackItems[0].image

    return '/assets/images/photo_placeholder.png'
  })()

  if (!trackItems || trackItems.length === 0)
    return (
      <S.Empty>
        <TriangleExclamationIcon />
        <S.EmptyText>{i18n.INSUFICIENT_DATA_TO_GENERATE_TOP_LIST}</S.EmptyText>
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
            {i18n.TIME_OPTIONS[timeRange][type][titleType].replace(
              '{{limit}}',
              limit + ''
            )}
          </S.Title>
          <S.HeaderInfoRow>
            <SpotifyLogo />
            <S.HeaderInfoRowItem $itemsBoxColor={color}>
              <CalendarIcon size=".875rem" />
              {new Intl.DateTimeFormat(locale, {
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
            $generatorType={type}
          >
            {trackItems &&
              trackItems.length > 0 &&
              trackItems.map((item, index) => (
                <li key={item.id}>
                  <TrackItem
                    {...item}
                    itemsBoxColor={color}
                    badgeNumber={
                      enableBadgeHightlights
                        ? index > 2
                          ? undefined
                          : index + 1
                        : undefined
                    }
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
            {i18n.ACCESS} {new URL(WEBSITE_URL).hostname}
          </S.CreatedByLink>
        </S.Footer>
      </>
    </S.Wrapper>
  )
}

export default UserTopItemsBox
