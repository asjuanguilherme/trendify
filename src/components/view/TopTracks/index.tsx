import * as S from './styles'
import { useEffect, useMemo, useRef, useState } from 'react'

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

// Components
import Spinner from 'components/shared/Spinner'
import Container from 'components/shared/Container'
import Logo from 'components/shared/Logo'
import Button from 'components/shared/Button'
import DownloadIcon from 'components/shared/icons/Download'
import TrackItem, { TrackItemStyle } from 'components/shared/TrackItem'
import Dropdown from 'components/shared/Dropdown'
import ColorPicker from 'components/shared/ColorPicker'
import Switch from 'components/shared/Switch'

export type TopTracksViewProps = {
  items: SpotifyTrack[]
  userData: SpotifyUserProfile
}

const limitOptions = [3, 5, 10]

const trackCardSizeByLimit = {
  3: 'large',
  5: 'medium',
  10: 'small'
}

const timeRangeOptions: {
  label: string
  value: TimeRange
  generatedText: string
}[] = [
  {
    label: 'Último mês',
    value: 'lastMonth',
    generatedText: 'do último mês'
  },
  {
    label: 'Último semestre',
    value: 'lastSixMonths',
    generatedText: 'do último semestre'
  },
  {
    label: 'Todos os tempos',
    value: 'allTime',
    generatedText: 'de todos os tempos'
  }
]

const generatedStyleOptions = [
  {
    label: 'Padrão',
    value: 'default'
  },
  {
    label: 'Spotify',
    value: 'spotify'
  }
]

const TopTracksView = ({
  items: initialItems,
  userData
}: TopTracksViewProps) => {
  const [items, setItems] = useState(initialItems)
  const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState(5)
  const [timeRange, setTimeRange] = useState<TimeRange>('lastMonth')
  const [generatedStyle, setGeneratedStyle] =
    useState<TrackItemStyle>('default')
  const boxRef = useRef<HTMLDivElement | null>(null)
  const [color, setColor] = useState<string>(dark.colors.layers[1].background)
  const [enableBackgroundImage, setEnableBackgroundImage] = useState(true)
  const [enableGradient, setEnableGradient] = useState(true)
  const [enableBlur, setEnableBlur] = useState(true)
  const [showProfileInfo, setShowProfileInfo] = useState(true)

  const saveAsImage = async () => {
    if (!boxRef.current) return

    const canvas = await html2canvas(boxRef.current, {
      windowWidth: 475,
      useCORS: true
    })

    const generatedImageURL = canvas.toDataURL('image/png', 3)

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

  return (
    <S.Wrapper>
      <Container>
        <S.SettingsForm>
          <S.SettingsFormSection>
            <S.SettingsFormSectionTitle>
              Tempo de Referência
            </S.SettingsFormSectionTitle>
            <S.TimeRangeOptions>
              {timeRangeOptions.map(option => (
                <Button
                  key={option.value}
                  onClick={() => setTimeRange(option.value)}
                  variant={option.value == timeRange ? 'filled' : 'basic'}
                  size="smaller"
                >
                  {option.label}
                </Button>
              ))}
            </S.TimeRangeOptions>
          </S.SettingsFormSection>
          <S.SettingsFormSection>
            <S.SettingsFormSectionTitle>
              Quantidade de Itens
            </S.SettingsFormSectionTitle>
            <S.LimitButtons>
              {limitOptions.map(option => (
                <Button
                  key={option}
                  onClick={() => setLimit(option)}
                  variant={option === limit ? 'filled' : 'basic'}
                  onlyIcon
                  size="small"
                >
                  {option}
                </Button>
              ))}
            </S.LimitButtons>
          </S.SettingsFormSection>
          <S.StyleOptions>
            <Dropdown
              label="Estilo dos Itens"
              options={generatedStyleOptions}
              selectedOptionValue={generatedStyle}
              onValueChange={value => setGeneratedStyle(value as 'spotify')}
              boxOptionsConfig={{
                closeAfterSelectOption: true
              }}
              fillWidth
            />
            <ColorPicker label="Cor" value={color} onChange={setColor} />
            <Switch
              label="Exibir imagem de plano de fundo"
              checked={enableBackgroundImage}
              onChange={() => setEnableBackgroundImage(state => !state)}
            />
            <Switch
              label="Habilitar gradiente"
              checked={enableGradient}
              onChange={() => setEnableGradient(state => !state)}
            />
            <Switch
              label="Desfocar plano de fundo"
              checked={enableBlur}
              onChange={() => setEnableBlur(state => !state)}
            />
            <Switch
              label="Exibir perfil"
              checked={showProfileInfo}
              onChange={() => setShowProfileInfo(state => !state)}
            />
          </S.StyleOptions>
        </S.SettingsForm>
        <S.ActionButtons>
          <Button variant="basic" fillWidth onClick={saveAsImage} size="small">
            Salvar Imagem <DownloadIcon />
          </Button>
        </S.ActionButtons>
      </Container>
      <Container>
        <S.Board>
          <S.GeneratedBox
            ref={boxRef}
            $color={color}
            $enableGradient={enableGradient}
            $enableBlur={enableBlur}
          >
            {loading && (
              <S.LoadingBoard>
                <Spinner />
              </S.LoadingBoard>
            )}
            {!loading && (
              <>
                {enableBackgroundImage && (
                  <S.GeneratedBoxImage $src={items[0].album.images[0].url} />
                )}
                {showProfileInfo && (
                  <S.Profile>
                    <S.ProfileImage src={userData.images[0].url} alt="" />
                    <S.ProfileName>{userData.display_name}</S.ProfileName>
                  </S.Profile>
                )}
                <S.Title>
                  Top {limit}{' '}
                  {
                    timeRangeOptions.filter(item => item.value === timeRange)[0]
                      .generatedText
                  }
                </S.Title>
                <S.Date>
                  {new Intl.DateTimeFormat('pt-BR', {
                    dateStyle: 'long'
                  }).format(new Date())}
                </S.Date>
                <S.ItemsList $style={generatedStyle}>
                  {items.map(item => (
                    <li key={item.id}>
                      <TrackItem
                        data={item}
                        size={trackCardSizeByLimit[limit as 3] as 'small'}
                        style={generatedStyle}
                      />
                    </li>
                  ))}
                </S.ItemsList>
                <S.CreatedBy>
                  Criado em <Logo />
                </S.CreatedBy>
              </>
            )}
          </S.GeneratedBox>
        </S.Board>
      </Container>
    </S.Wrapper>
  )
}

export default TopTracksView
