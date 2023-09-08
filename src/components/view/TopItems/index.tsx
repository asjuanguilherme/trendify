import * as S from './styles'
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

// Types
import { SpotifyTrack } from 'services/spotify/types/Track'
import { SpotifyUserProfile } from 'services/spotify/types'

// Utils
import { toPng } from 'html-to-image'
import dark from 'styles/themes/dark'

// Services
import { getMyTopTracks } from 'services/spotify/queries/getMyTopTracks'

import Button, { ButtonProps } from 'components/shared/Button'
import DownloadIcon from 'components/shared/icons/Download'
import { TrackItemStyle } from 'components/shared/TrackItem'
import Dropdown from 'components/shared/Dropdown'
import Switch from 'components/shared/Switch'
import { trackItemStyleVariantOptions } from 'components/shared/TrackItem/utils'
import UserTopItemsBox from 'components/shared/UserTopItemsBox'
import ColorPicker from 'components/shared/ColorPicker'
import ColorOption from 'components/shared/ColorOption'
import useScreen from 'hooks/useScreen'
import { breakpoints } from 'styles/screens'
import { TimeRange, topItemsGeneratorConfig } from 'config/topItemsGenerator'

export type TopItemsViewProps = {
  items: SpotifyTrack[]
  userData: SpotifyUserProfile
}

const TopItemsView = ({ items: initialItems, userData }: TopItemsViewProps) => {
  const screen = useScreen()
  const isLaptopUp = screen.width > breakpoints.laptop

  const [loadingData, setLoadingData] = useState(false)
  const [items, setItems] = useState(initialItems)

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

  const boxRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setLoadingData(true)
    ;(async () => {
      try {
        const reqData = await getMyTopTracks({ limit, timeRange, ctx: null })
        setItems(reqData)
      } catch (err) {
      } finally {
        setLoadingData(false)
      }
    })()
  }, [limit, timeRange])

  const downloadImage = async () => {
    if (!boxRef.current) return

    const dataUrl = await toPng(boxRef.current, {
      quality: 1,
      canvasWidth: topItemsGeneratorConfig.boxWidth
    })

    const downloadLink = document.createElement('a')
    downloadLink.href = dataUrl
    downloadLink.download = 'top_tracks.png'
    downloadLink.click()
  }

  const SaveButton = useCallback(
    (props: ButtonProps) => (
      <Button
        fillWidth
        {...props}
        onClick={downloadImage}
        disabled={loadingData}
      >
        Salvar Imagem <DownloadIcon />
      </Button>
    ),
    [loadingData]
  )

  const GeneratedTopItems = useCallback(
    (props: { boxRef?: MutableRefObject<HTMLDivElement | null> }) => (
      <UserTopItemsBox
        boxRef={props?.boxRef}
        type="tracks"
        trackItems={items}
        color={color}
        enableBackgroundImage={enableBackgroundImage}
        enableBlur={enableBlur}
        enableGradient={enableGradient}
        enableBadgeHightlights={enableBadgeHightlights}
        limit={limit}
        selectedItemsStyle={selectedItemsStyle}
        showProfileInfo={showProfileInfo}
        timeRange={timeRange}
        userData={userData}
        loading={loadingData}
      />
    ),
    [
      color,
      enableBackgroundImage,
      enableBadgeHightlights,
      enableBlur,
      enableGradient,
      items,
      limit,
      selectedItemsStyle,
      showProfileInfo,
      timeRange,
      userData,
      loadingData
    ]
  )

  return (
    <S.Wrapper>
      <S.HiddenTopItemsBox>
        <GeneratedTopItems boxRef={boxRef} />
      </S.HiddenTopItemsBox>

      {items.length > 0 && !isLaptopUp && (
        <S.FloatingSaveButton>
          <SaveButton />
        </S.FloatingSaveButton>
      )}
      <S.Container>
        <S.SettingsForm>
          <S.SettingsFormSection>
            <S.SettingsFormSectionTitle>
              Gerar Top Músicas Ouvidas
            </S.SettingsFormSectionTitle>
            <S.SettingsFormSectionContent>
              <S.SettingsFormGroup>
                <S.SettingsFormGroupLabel>
                  Tempo de Referência
                </S.SettingsFormGroupLabel>
                <S.TimeRangeOptions>
                  {Object.keys(topItemsGeneratorConfig.timeOptions).map(
                    item => {
                      const key = item as TimeRange
                      const { label } = topItemsGeneratorConfig.timeOptions[key]

                      return (
                        <Button
                          key={key}
                          onClick={() => setTimeRange(key)}
                          variant={key == timeRange ? 'filled' : 'basic'}
                          size="smaller"
                          layer={0}
                        >
                          {label}
                        </Button>
                      )
                    }
                  )}
                </S.TimeRangeOptions>
              </S.SettingsFormGroup>
              <S.SettingsFormGroup>
                <S.SettingsFormGroupLabel>
                  Quantidade de Itens
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
              Ajuste de Estilos
            </S.SettingsFormSectionTitle>
            {items && items.length > 0 && (
              <S.StyleOptions>
                <S.SuggestedColors>
                  {topItemsGeneratorConfig.suggestedColorsOptions.map(color => (
                    <ColorOption
                      key={color}
                      hexColor={color}
                      onClick={() => setColor(color)}
                    />
                  ))}
                  <ColorPicker
                    label="Personalizar"
                    value={color}
                    onChange={setColor}
                  />
                </S.SuggestedColors>
                {showAdvancedStyles && (
                  <>
                    <Dropdown
                      label="Estilo dos Itens"
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
                    <Switch
                      label="Exibir imagem de plano de fundo"
                      checked={enableBackgroundImage}
                      onChange={() => setEnableBackgroundImage(state => !state)}
                      layer={0}
                    />
                    <Switch
                      label="Habilitar gradiente"
                      checked={enableGradient}
                      onChange={() => setEnableGradient(state => !state)}
                      layer={0}
                    />
                    <Switch
                      label="Desfocar plano de fundo"
                      checked={enableBlur}
                      onChange={() => setEnableBlur(state => !state)}
                      layer={0}
                    />
                    <Switch
                      label="Exibir perfil"
                      checked={showProfileInfo}
                      onChange={() => setShowProfileInfo(state => !state)}
                      layer={0}
                    />
                    <Switch
                      label="Exibir numeração no top 3 (Experimental)"
                      checked={enableBadgeHightlights}
                      onChange={() => setEnableBadgeHighlights(state => !state)}
                      layer={0}
                    />
                  </>
                )}
              </S.StyleOptions>
            )}
            <S.SettingsFormSectionCollapseButton
              onClick={() => setShowAdvancedStyles(state => !state)}
            >
              {showAdvancedStyles ? 'Menos opções' : 'Mais opções'}
            </S.SettingsFormSectionCollapseButton>
          </S.SettingsFormSection>
        </S.SettingsForm>
        <S.VisibleTopItemsBox>
          <GeneratedTopItems />
          {items.length > 0 && isLaptopUp && (
            <SaveButton style={{ marginTop: '1rem' }} />
          )}
        </S.VisibleTopItemsBox>
      </S.Container>
    </S.Wrapper>
  )
}

export default TopItemsView
