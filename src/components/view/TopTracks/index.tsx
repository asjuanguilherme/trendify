import * as S from './styles'
import { useCallback, useEffect, useRef, useState } from 'react'

// Types
import { SpotifyTrack } from 'services/spotify/types/Track'
import { SpotifyUserProfile } from 'services/spotify/types'

// Utils
import html2canvas from 'html2canvas'
import dark from 'styles/themes/dark'

// Services
import {
  TimeRange,
  getMyTopTracks
} from 'services/spotify/queries/getMyTopTracks'

import Container from 'components/shared/Container'
import Button, { ButtonProps } from 'components/shared/Button'
import DownloadIcon from 'components/shared/icons/Download'
import { TrackItemStyle } from 'components/shared/TrackItem'
import Dropdown from 'components/shared/Dropdown'
import Switch from 'components/shared/Switch'
import { timeRangeOptions } from 'components/shared/UserTopItemsBox/utils'
import { trackItemStyleVariantOptions } from 'components/shared/TrackItem/utils'
import UserTopItemsBox from 'components/shared/UserTopItemsBox'
import ColorPicker from 'components/shared/ColorPicker'
import ColorOption from 'components/shared/ColorOption'
import mainColors from 'styles/mainColors'
import useScreen from 'hooks/useScreen'
import { breakpoints } from 'styles/screens'

export type TopTracksViewProps = {
  items: SpotifyTrack[]
  userData: SpotifyUserProfile
}

const limitOptions = [3, 5, 10]

const suggestedColors = [
  dark.colors.layers[1].background,
  mainColors.primary.normal,
  mainColors.secondary.normal,
  '#E5C02D',
  '#2B2382',
  '#E253EF',
  '#000000',
  '#ffffff'
]

const TopTracksView = ({
  items: initialItems,
  userData
}: TopTracksViewProps) => {
  const screen = useScreen()
  const isLaptopUp = screen.width > breakpoints.laptop
  const [items, setItems] = useState(initialItems)
  const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState(5)
  const [timeRange, setTimeRange] = useState<TimeRange>('lastMonth')
  const [selectedItemsStyle, setSelectedItemsStyle] =
    useState<TrackItemStyle>('default')
  const boxRef = useRef<HTMLDivElement | null>(null)
  const [color, setColor] = useState<string>(dark.colors.layers[1].background)
  const [enableBackgroundImage, setEnableBackgroundImage] = useState(true)
  const [enableGradient, setEnableGradient] = useState(true)
  const [enableBlur, setEnableBlur] = useState(true)
  const [showProfileInfo, setShowProfileInfo] = useState(true)
  const [enableBadgeHightlights, setEnableBadgeHighlights] = useState(false)
  const [showAdvancedStyles, setShowAdvancedStyles] = useState(false)

  const saveAsImage = async () => {
    if (!boxRef.current) return

    const canvas = await html2canvas(boxRef.current, {
      windowWidth: 350,
      useCORS: true,
      backgroundColor: 'transparent',
      scale: 2
    })

    const generatedImageURL = canvas.toDataURL('image/png', 1)

    const downloadLink = document.createElement('a')
    downloadLink.href = generatedImageURL
    downloadLink.download = 'top_tracks.png'
    downloadLink.click()
  }

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      try {
        const reqData = await getMyTopTracks({ limit, timeRange, ctx: null })
        setItems(reqData)
      } catch (err) {
      } finally {
        setLoading(false)
      }
    })()
  }, [limit, timeRange])

  const SaveButton = useCallback(
    (props: ButtonProps) => (
      <Button onClick={saveAsImage} fillWidth {...props}>
        Salvar <DownloadIcon />
      </Button>
    ),
    []
  )

  return (
    <S.Wrapper>
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
                  {timeRangeOptions.map(option => (
                    <Button
                      key={option.value}
                      onClick={() => setTimeRange(option.value)}
                      variant={option.value == timeRange ? 'filled' : 'basic'}
                      size="smaller"
                      layer={0}
                    >
                      {option.label}
                    </Button>
                  ))}
                </S.TimeRangeOptions>
              </S.SettingsFormGroup>
              <S.SettingsFormGroup>
                <S.SettingsFormGroupLabel>
                  Quantidade de Itens
                </S.SettingsFormGroupLabel>
                <S.LimitButtons>
                  {limitOptions.map(option => (
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
                  {suggestedColors.map(color => (
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
        <div style={{ margin: '0 auto' }}>
          <S.Board>
            <UserTopItemsBox
              type="tracks"
              trackItems={items}
              boxRef={boxRef}
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
            />
          </S.Board>
          <S.ActionButtons>
            {items.length > 0 && isLaptopUp && (
              <SaveButton style={{ maxWidth: 350, marginTop: '1rem' }} />
            )}
          </S.ActionButtons>
        </div>
      </S.Container>
    </S.Wrapper>
  )
}

export default TopTracksView
