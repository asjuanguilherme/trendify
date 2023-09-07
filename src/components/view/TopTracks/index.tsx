import * as S from './styles'
import { useEffect, useMemo, useRef, useState } from 'react'

// Types
import { SpotifyTrack } from 'services/spotify/types/Track'

// Utils
import ModalIdentifiers from 'contexts/ModalContext/identifiers'
import { useModal } from 'contexts/ModalContext'
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
import GearIcon from 'components/shared/icons/Gear'
import DownloadIcon from 'components/shared/icons/Download'
import TrackItem, { TrackItemStyle } from 'components/shared/TrackItem'
import Dropdown from 'components/shared/Dropdown'
import ColorPicker from 'components/shared/ColorPicker'
import Switch from 'components/shared/Switch'

export type TopTracksViewProps = {
  items: SpotifyTrack[]
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

const TopTracksView = ({ items: initialItems }: TopTracksViewProps) => {
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

  const saveAsImage = async () => {
    if (!boxRef.current) return

    const canvas = await html2canvas(boxRef.current, {
      windowWidth: 475,
      useCORS: true
    })
    const generatedImageURL = canvas.toDataURL('image/png', 1.3)

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

  const settingsContent = useMemo(() => {
    if (loading)
      return (
        <S.LoadingBoard>
          <Spinner />
        </S.LoadingBoard>
      )

    return (
      <S.SettingsForm>
        <S.SettingsFormSection>
          <S.SettingsFormSectionTitle>Estilo</S.SettingsFormSectionTitle>
          <Dropdown
            options={generatedStyleOptions}
            selectedOptionValue={generatedStyle}
            onValueChange={value => setGeneratedStyle(value as 'spotify')}
            boxOptionsConfig={{
              closeAfterSelectOption: true
            }}
            fillWidth
          />
        </S.SettingsFormSection>
      </S.SettingsForm>
    )
  }, [generatedStyle, loading])

  const topTracksSettingsModal = useModal(
    ModalIdentifiers.TOP_TRACKS_SETTINGS,
    {
      title: 'Gerar Top Músicas',
      opened: false,
      content: settingsContent
    }
  )

  useEffect(() => {
    topTracksSettingsModal.update({
      content: settingsContent
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsContent])

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
          <S.SettingsFormSection>
            <S.SettingsFormSectionTitle>Cor</S.SettingsFormSectionTitle>
            <ColorPicker value={color} onChange={setColor} />
          </S.SettingsFormSection>
          <S.SettingsFormSection>
            <S.SettingsFormSectionTitle>
              Usar imagem de plano de fundo
            </S.SettingsFormSectionTitle>
            <Switch
              checked={enableBackgroundImage}
              onChange={() => setEnableBackgroundImage(state => !state)}
            />
          </S.SettingsFormSection>
          <S.SettingsFormSection>
            <S.SettingsFormSectionTitle>
              Usar gradiente
            </S.SettingsFormSectionTitle>
            <Switch
              checked={enableGradient}
              onChange={() => setEnableGradient(state => !state)}
            />
          </S.SettingsFormSection>
        </S.SettingsForm>
        <S.ActionButtons>
          <Button
            variant="basic"
            fillWidth
            onClick={topTracksSettingsModal.open}
            size="small"
          >
            Configurar <GearIcon />
          </Button>
          <Button variant="basic" fillWidth onClick={saveAsImage} size="small">
            Salvar <DownloadIcon />
          </Button>
        </S.ActionButtons>
      </Container>
      <Container>
        <S.Board>
          <S.GeneratedBox
            ref={boxRef}
            $color={color}
            $enableGradient={enableGradient}
          >
            {loading && (
              <S.LoadingBoard>
                <Spinner />
              </S.LoadingBoard>
            )}
            {!loading && (
              <>
                {enableBackgroundImage && (
                  <S.GeneratedBoxImage src={items[0].album.images[0].url} />
                )}
                <S.Title>
                  Seu top {limit}{' '}
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
