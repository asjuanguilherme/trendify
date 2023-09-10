import * as S from './styles'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// Types
import { SpotifyUserProfile } from 'services/spotify/types'
import { GlobalTrackItem } from 'types/TrackItem'

// Utils
import { toBlob, toPng } from 'html-to-image'
import dark from 'styles/themes/dark'
import { breakpoints } from 'styles/screens'
import {
  GeneratorType,
  TimeRange,
  topItemsGeneratorConfig
} from 'config/topItemsGenerator'
import useScreen from 'hooks/useScreen'
import { useI18n } from 'hooks/useI18n'
import { useLocale } from 'hooks/useLocale'
import { trackItemStyleVariantOptions } from 'components/shared/TrackItem/utils'

// Services
import { getMyTopTracks } from 'services/spotify/queries/getMyTopTracks'
import { getMyTopArtists } from 'services/spotify/queries'
import { getMyTopGenres } from 'services/spotify/queries/getMyTopGenres'

// Components
import Button, { ButtonProps } from 'components/shared/Button'
import DownloadIcon from 'components/shared/icons/Download'
import { TrackItemStyle } from 'components/shared/TrackItem'
import Dropdown from 'components/shared/Dropdown'
import Switch from 'components/shared/Switch'
import UserTopItemsBox, {
  UserTopItemsBoxProps
} from 'components/shared/UserTopItemsBox'
import ColoredButton from 'components/shared/ColoredButton'
import { blob } from 'stream/consumers'
import ShareNodesIcon from 'components/shared/icons/ShareNodes'

export type GeneratorViewProps = {
  items: GlobalTrackItem[]
  userData: SpotifyUserProfile
}

const GeneratorView = ({
  items: initialItems,
  userData
}: GeneratorViewProps) => {
  const i18n = useI18n()
  const locale = useLocale()
  const screen = useScreen()
  const isLaptopUp = screen.width > breakpoints.laptop

  const [loadingData, setLoadingData] = useState(false)
  const [items, setItems] = useState(initialItems)

  const [type, setType] = useState<GeneratorType>('tracks')
  const [limit, setLimit] = useState(5)
  const [timeRange, setTimeRange] = useState<TimeRange>('lastMonth')

  const [selectedItemsStyle, setSelectedItemsStyle] =
    useState<TrackItemStyle>('default')
  const [color, setColor] = useState<string>(dark.colors.layers[1].background)
  const [enableBackgroundImage, setEnableBackgroundImage] = useState(true)
  const [enableGradient, setEnableGradient] = useState(true)
  const [enableBlur, setEnableBlur] = useState(true)
  const [showProfileInfo, setShowProfileInfo] = useState(true)
  const [enableBadgeHightlights, setEnableBadgeHighlights] = useState(false)
  const [showAdvancedStyles, setShowAdvancedStyles] = useState(false)
  const [titleType, setTitleType] =
    useState<UserTopItemsBoxProps['titleType']>('large')
  const [roundedCorners, setRoundedCorners] = useState(true)

  const customColorInputRef = useRef<HTMLInputElement | null>(null)
  const boxRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setLoadingData(true)
    ;(async () => {
      try {
        const reqData =
          type == 'tracks'
            ? await getMyTopTracks({ limit, timeRange, ctx: null })
            : type == 'genres'
            ? await getMyTopGenres({ limit, timeRange, ctx: null })
            : await getMyTopArtists({ limit, timeRange, ctx: null })
        setItems(reqData)
      } catch (err) {
        console.log(err)
      } finally {
        setLoadingData(false)
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
      backgroundColor: 'transparent'
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

  const userTopItemsBoxProps: UserTopItemsBoxProps = {
    timeRange,
    limit,
    userData,
    trackItems: items,
    color,
    loading: loadingData,
    enableBackgroundImage,
    enableBlur,
    enableGradient,
    enableBadgeHightlights,
    selectedItemsStyle,
    showProfileInfo,
    titleType,
    roundedCorners,
    type
  }

  return (
    <S.Wrapper>
      <S.Container>
        <S.SettingsForm>
          <S.SettingsFormSection>
            <S.SettingsFormSectionTitle>
              {i18n.GENERATOR_PAGE.GENERATOR_SETTINGS.TITLE}
            </S.SettingsFormSectionTitle>
            <S.SettingsFormSectionContent>
              <S.SettingsFormGroup>
                <S.SettingsFormGroupLabel>
                  {i18n.GENERATOR_PAGE.GENERATOR_SETTINGS.TYPE_LABEL}
                </S.SettingsFormGroupLabel>
                <S.TimeRangeOptions>
                  {Object.values(topItemsGeneratorConfig.typeOptions).map(
                    key => (
                      <Button
                        key={key}
                        onClick={() => setType(key)}
                        variant={key == type ? 'filled' : 'basic'}
                        size="smaller"
                        layer={0}
                      >
                        {i18n.TYPE_OPTIONS[key]}
                      </Button>
                    )
                  )}
                </S.TimeRangeOptions>
              </S.SettingsFormGroup>
              <S.SettingsFormGroup>
                <S.SettingsFormGroupLabel>
                  {i18n.GENERATOR_PAGE.GENERATOR_SETTINGS.TIME_RANGE_LABEL}
                </S.SettingsFormGroupLabel>
                <S.TimeRangeOptions>
                  {Object.values(topItemsGeneratorConfig.timeOptions).map(
                    key => (
                      <Button
                        key={key}
                        onClick={() => setTimeRange(key)}
                        variant={key == timeRange ? 'filled' : 'basic'}
                        size="smaller"
                        layer={0}
                      >
                        {i18n.TIME_OPTIONS[key].title}
                      </Button>
                    )
                  )}
                </S.TimeRangeOptions>
              </S.SettingsFormGroup>
              <S.SettingsFormGroup>
                <S.SettingsFormGroupLabel>
                  {i18n.GENERATOR_PAGE.GENERATOR_SETTINGS.LIMIT_LABEL}
                </S.SettingsFormGroupLabel>
                <S.LimitButtons>
                  {topItemsGeneratorConfig.limitOptions.map(option => (
                    <Button
                      key={option}
                      onClick={() => setLimit(option)}
                      variant={option === limit ? 'filled' : 'basic'}
                      onlyIcon
                      size="small"
                      layer={0}
                    >
                      {option}
                    </Button>
                  ))}
                </S.LimitButtons>
              </S.SettingsFormGroup>
            </S.SettingsFormSectionContent>
          </S.SettingsFormSection>
          <S.SettingsFormSection>
            <S.SettingsFormSectionTitle>
              {i18n.GENERATOR_PAGE.GENERATOR_SETTINGS.STYLES_SETTINGS}
            </S.SettingsFormSectionTitle>
            {items && items.length > 0 && (
              <S.SettingsFormSectionContent>
                <S.SettingsFormGroup>
                  <S.SettingsFormGroupLabel>
                    {i18n.COLOR}
                  </S.SettingsFormGroupLabel>
                  <S.SuggestedColors>
                    {topItemsGeneratorConfig.suggestedColorsOptions.map(
                      colorOption => (
                        <ColoredButton
                          key={colorOption}
                          hexColor={colorOption}
                          onClick={() => setColor(colorOption)}
                          active={colorOption === color}
                          size="small"
                          onlyIcon
                        />
                      )
                    )}
                    <Button
                      size="small"
                      onClick={() => {
                        customColorInputRef.current?.click()
                      }}
                      variant="outlined"
                    >
                      {i18n.CUSTOM_COLOR}
                    </Button>
                    <input
                      ref={customColorInputRef}
                      value={color}
                      onChange={e => setColor(e.target.value)}
                      type="color"
                      hidden
                    />
                  </S.SuggestedColors>
                </S.SettingsFormGroup>
                {showAdvancedStyles && (
                  <>
                    <Dropdown
                      label={i18n.GENERATOR_PAGE.GENERATOR_SETTINGS.ITEMS_STYLE}
                      options={trackItemStyleVariantOptions}
                      selectedOptionValue={selectedItemsStyle}
                      onValueChange={value =>
                        setSelectedItemsStyle(value as 'spotify')
                      }
                      boxOptionsConfig={{
                        closeAfterSelectOption: true
                      }}
                      fillWidth
                      layer={0}
                    />
                    <S.Switches>
                      <Switch
                        label={
                          i18n.GENERATOR_PAGE.GENERATOR_SETTINGS.SHOW_BACKGROUND
                        }
                        checked={enableBackgroundImage}
                        onChange={() =>
                          setEnableBackgroundImage(state => !state)
                        }
                        layer={0}
                      />
                      <Switch
                        label={
                          i18n.GENERATOR_PAGE.GENERATOR_SETTINGS.ENABLE_GRADIENT
                        }
                        checked={enableGradient}
                        onChange={() => setEnableGradient(state => !state)}
                        layer={0}
                      />
                      <Switch
                        label={
                          i18n.GENERATOR_PAGE.GENERATOR_SETTINGS.BLUR_BACKGROUND
                        }
                        checked={enableBlur}
                        onChange={() => setEnableBlur(state => !state)}
                        layer={0}
                      />
                      <Switch
                        label={
                          i18n.GENERATOR_PAGE.GENERATOR_SETTINGS.SHOW_PROFILE
                        }
                        checked={showProfileInfo}
                        onChange={() => setShowProfileInfo(state => !state)}
                        layer={0}
                      />
                      <Switch
                        label={
                          i18n.GENERATOR_PAGE.GENERATOR_SETTINGS.LARGE_TITLE
                        }
                        checked={titleType === 'large'}
                        onChange={() =>
                          setTitleType(state =>
                            state === 'short' ? 'large' : 'short'
                          )
                        }
                        layer={0}
                      />
                      <Switch
                        label={
                          i18n.GENERATOR_PAGE.GENERATOR_SETTINGS.ROUND_CORNERS
                        }
                        checked={roundedCorners}
                        onChange={() => setRoundedCorners(state => !state)}
                        layer={0}
                      />
                      <Switch
                        label={
                          i18n.GENERATOR_PAGE.GENERATOR_SETTINGS.NUMBERED_TOP_3
                        }
                        checked={enableBadgeHightlights}
                        onChange={() =>
                          setEnableBadgeHighlights(state => !state)
                        }
                        layer={0}
                      />
                    </S.Switches>
                  </>
                )}
              </S.SettingsFormSectionContent>
            )}
            <S.SettingsFormSectionCollapseButton
              onClick={() => setShowAdvancedStyles(state => !state)}
            >
              {showAdvancedStyles ? i18n.LESS_OPTIONS : i18n.MORE_OPTIONS}
            </S.SettingsFormSectionCollapseButton>
          </S.SettingsFormSection>
        </S.SettingsForm>
        <S.HiddenTopItemsBox>
          <UserTopItemsBox boxRef={boxRef} {...userTopItemsBoxProps} />
        </S.HiddenTopItemsBox>
        <S.VisibleTopItemsBox>
          <UserTopItemsBox {...userTopItemsBoxProps} />
          {items.length > 0 && (
            <S.SharingButtons>
              <Button fillWidth onClick={shareImage} disabled={loadingData}>
                {i18n.SHARE_BUTTON_LABEL}
                <ShareNodesIcon />
              </Button>
              <Button onClick={downloadImage} disabled={loadingData}>
                <DownloadIcon />
              </Button>
            </S.SharingButtons>
          )}
        </S.VisibleTopItemsBox>
      </S.Container>
    </S.Wrapper>
  )
}

export default GeneratorView
