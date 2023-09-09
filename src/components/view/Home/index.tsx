import * as S from './styles'
import ButtonLink from 'components/shared/ButtonLink'
import SpotifyLogo from 'components/shared/SpotifyLogo'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useModals } from 'contexts/ModalContext'
import StateModalContent from 'components/shared/StateModalContent'
import ModalIdentifiers from 'contexts/ModalContext/identifiers'
import { useI18n } from 'hooks/useI18n'

export type HomeViewProps = {}

const authStates = {
  unlogged: {
    type: 'success',
    title: 'Sessão Encerrada',
    text: 'Sua sessão foi encerrada com sucesso. Você pode fazer login novamente a qualquer momento.'
  },
  sessionExpired: {
    type: 'warning',
    title: 'Sessão Expirada',
    text: 'Sua sessão expirou. Por favor, faça o login novamente para continuar usando o aplicativo.'
  },
  needsPermission: {
    type: 'error',
    title: 'Acesso Restrito a Testadores',
    text: 'Desculpe, você não possui autorização para acessar este aplicativo. Atualmente, ele está em fase de testes e o acesso é restrito aos testadores autorizados.'
  }
} as const

const authStatesKeys = Object.keys(authStates)

const HomeView = ({}: HomeViewProps) => {
  const router = useRouter()
  const i18n = useI18n()
  const { addModal, closeModal } = useModals()

  useEffect(() => {
    const queryKeys = Object.keys(router.query)
    const authStateName = queryKeys[0] as 'unlogged'

    if (authStatesKeys.includes(authStateName)) {
      const authStateFeedbackData = authStates[authStateName]

      addModal({
        identifier: ModalIdentifiers.AUTH_STATE_MODAL,
        showX: false,
        content: (
          <StateModalContent
            type={authStateFeedbackData.type}
            title={authStateFeedbackData.title}
            description={authStateFeedbackData.text}
            buttons={[
              {
                children: 'Entendi',
                onClick: () => closeModal(ModalIdentifiers.AUTH_STATE_MODAL)
              }
            ]}
          />
        )
      })

      router.replace(router.pathname, undefined, { shallow: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <S.Wrapper>
      <S.PageView showReturn={false}>
        <h1>{i18n.HOME_PAGE.TITLE}</h1>
        <p>{i18n.HOME_PAGE.SEO_DESCRIPTION}</p>
        <ButtonLink style={{ marginTop: '1.5rem' }} href="/login">
          {i18n.LOGIN_WITH_BUTTON_LABEL}
          <SpotifyLogo style={{ fontSize: '1.35rem', marginLeft: '-.3rem' }} />
        </ButtonLink>
      </S.PageView>
    </S.Wrapper>
  )
}

export default HomeView
