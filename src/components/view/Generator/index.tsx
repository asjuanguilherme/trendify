import * as S from './styles'
import { useEffect, useRef, useState } from 'react'

// Types
import { SpotifyUserProfile } from 'services/spotify/types'
import { GlobalTrackItem } from 'types/TrackItem'

// Utils
import { toBlob, toPng } from 'html-to-image'
import dark from 'styles/themes/dark'
import {
  GeneratorType,
  TimeRange,
  topItemsGeneratorConfig
} from 'config/topItemsGenerator'
import { useI18n } from 'hooks/useI18n'

// Services
import { getMyTopTracksForClientSide } from 'services/spotify/queries/getMyTopTracks'
import { getMyTopArtistsForClientSide } from 'services/spotify/queries'
import { getMyTopGenresForClientSide } from 'services/spotify/queries/getMyTopGenres'

// Components
import Button from 'components/shared/Button'
import DownloadIcon from 'components/shared/icons/Download'
import { TrackItemStyle } from 'components/shared/TrackItem'
import UserTopItemsBox, {
  UserTopItemsBoxProps
} from 'components/shared/UserTopItemsBox'
import ShareNodesIcon from 'components/shared/icons/ShareNodes'
import GeneratorSettings from 'components/shared/GeneratorSettings'
import { breakpoints } from 'styles/screens'
import useScreen from 'hooks/useScreen'

export type GeneratorViewProps = {
  items: GlobalTrackItem[]
  userData: SpotifyUserProfile
}

export type GeneratorSettingsProps = {
  timeRange: TimeRange
  limit: number
  userData: SpotifyUserProfile
  items: GlobalTrackItem[]
  color: string
  loading: boolean
  enableBackgroundImage: boolean
  enableBlur: boolean
  enableGradient: boolean
  enableBadgeHightlights: boolean
  selectedItemsStyle: TrackItemStyle
  showProfileInfo: boolean
  titleType: UserTopItemsBoxProps['titleType']
  roundedCorners: boolean
  type: GeneratorType
  setType: React.Dispatch<React.SetStateAction<GeneratorType>>
  setEnableBackgroundImage: React.Dispatch<React.SetStateAction<boolean>>
  setEnableGradient: React.Dispatch<React.SetStateAction<boolean>>
  setEnableBadgeHighlights: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedItemsStyle: React.Dispatch<React.SetStateAction<TrackItemStyle>>
  setShowProfileInfo: React.Dispatch<React.SetStateAction<boolean>>
  setTitleType: React.Dispatch<
    React.SetStateAction<UserTopItemsBoxProps['titleType']>
  >
  setRoundedCorners: React.Dispatch<React.SetStateAction<boolean>>
  setColor: React.Dispatch<React.SetStateAction<string>>
  setTimeRange: React.Dispatch<React.SetStateAction<TimeRange>>
  setLimit: React.Dispatch<React.SetStateAction<number>>
  setEnableBlur: React.Dispatch<React.SetStateAction<boolean>>
}

const GeneratorView = ({
  items: initialItems,
  userData
}: GeneratorViewProps) => {
  const i18n = useI18n()

  const screen = useScreen()
  const isLaptopUp = screen.width > breakpoints.laptop

  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState(initialItems)

  const [isMaximized, setIsMaximized] = useState(false)

  const [type, setType] = useState<GeneratorType>('tracks')
  const [limit, setLimit] = useState(5)
  const [timeRange, setTimeRange] = useState<TimeRange>('lastMonth')

  const [selectedItemsStyle, setSelectedItemsStyle] =
    useState<TrackItemStyle>('default')
  const [color, setColor] = useState<string>(dark.colors.layers[1].background)
  const [enableBackgroundImage, setEnableBackgroundImage] = useState(false)
  const [enableBlur, setEnableBlur] = useState(false)
  const [enableGradient, setEnableGradient] = useState(true)
  const [showProfileInfo, setShowProfileInfo] = useState(true)
  const [enableBadgeHightlights, setEnableBadgeHighlights] = useState(false)
  const [titleType, setTitleType] =
    useState<UserTopItemsBoxProps['titleType']>('large')
  const [roundedCorners, setRoundedCorners] = useState(true)

  const boxRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      try {
        const reqData =
          type == 'tracks'
            ? await getMyTopTracksForClientSide({ limit, timeRange, ctx: null })
            : type == 'genres'
            ? await getMyTopGenresForClientSide({ limit, timeRange, ctx: null })
            : await getMyTopArtistsForClientSide({
                limit,
                timeRange,
                ctx: null
              })
        setItems(reqData)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [limit, timeRange, type])

  const downloadImage = async () => {
    if (!boxRef.current) return

    const dataUrl = await toPng(boxRef.current, {
      quality: 1,
      canvasWidth: topItemsGeneratorConfig.boxWidth
    })

    console.log(dataUrl)

    const downloadLink = document.createElement('a')
    downloadLink.href = dataUrl
    downloadLink.download = 'image.png'
    downloadLink.click()
  }

  const shareImage = async () => {
    if (!boxRef.current) return
    if (!('share' in navigator)) return

    const blobImage = await toBlob(boxRef.current, {
      quality: 1,
      canvasWidth: topItemsGeneratorConfig.boxWidth,
      backgroundColor: color
    })

    if (!blobImage) throw new Error('Fail to generate image')

    const shareData = {
      title: i18n.TIME_OPTIONS[timeRange][type].short,
      files: [new File([blobImage], 'image.png', { type: blobImage.type })]
    }

    if (navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.log(err.name, err.message)
        }
      }
    } else {
      console.warn('Sharing not supported', shareData)
    }
  }

  const generatorSettingsProps = {
    timeRange,
    limit,
    userData,
    items,
    color,
    loading,
    enableBackgroundImage,
    enableBlur,
    enableGradient,
    enableBadgeHightlights,
    selectedItemsStyle,
    showProfileInfo,
    titleType,
    roundedCorners,
    type,
    setType,
    setEnableBackgroundImage,
    setEnableGradient,
    setEnableBadgeHighlights,
    setSelectedItemsStyle,
    setShowProfileInfo,
    setTitleType,
    setRoundedCorners,
    setColor,
    setTimeRange,
    setLimit,
    setEnableBlur
  }

  return (
    <S.Wrapper>
      <S.Container>
        <S.HiddenTopItemsBox>
          <UserTopItemsBox boxRef={boxRef} {...generatorSettingsProps} />
        </S.HiddenTopItemsBox>
        <GeneratorSettings {...generatorSettingsProps} />
        <div>
          <S.VisibleTopItemsBox $isMaximized={isMaximized}>
            <UserTopItemsBox {...generatorSettingsProps} />
            {items.length > 0 && (
              <S.SharingButtons>
                <Button
                  fillWidth
                  onClick={shareImage}
                  disabled={loading}
                  size={isLaptopUp ? 'default' : 'small'}
                >
                  {i18n.SHARE_BUTTON_LABEL}
                  <ShareNodesIcon />
                </Button>
                <Button
                  onClick={downloadImage}
                  disabled={loading}
                  size={isLaptopUp ? 'default' : 'small'}
                >
                  <DownloadIcon />
                </Button>
              </S.SharingButtons>
            )}
          </S.VisibleTopItemsBox>
        </div>
      </S.Container>
    </S.Wrapper>
  )
}

export default GeneratorView
