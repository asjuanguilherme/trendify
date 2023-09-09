import * as S from './styles'
import ButtonLink from 'components/shared/ButtonLink'
import SpotifyLogo from 'components/shared/SpotifyLogo'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useModals } from 'contexts/ModalContext'
import StateModalContent from 'components/shared/StateModalContent'
import ModalIdentifiers from 'contexts/ModalContext/identifiers'
import { useI18n } from 'hooks/useI18n'
import { useLocale } from 'hooks/useLocale'

export type HomeViewProps = {}

const authStates = {
  unlogged: {
    type: 'success',
    title: {
      en: 'Session Ended',
      'pt-BR': 'Sessão Encerrada',
      es: 'Sesión Finalizada'
    },
    text: {
      en: 'Your session has ended successfully. You can log in again at any time.',
      'pt-BR':
        'Sua sessão foi encerrada com sucesso. Você pode fazer login novamente a qualquer momento.',
      es: 'Tu sesión ha finalizado con éxito. Puedes iniciar sesión de nuevo en cualquier momento.'
    }
  },
  sessionExpired: {
    type: 'warning',
    title: {
      en: 'Session Expired',
      'pt-BR': 'Sessão Expirada',
      es: 'Sesión Caducada'
    },
    text: {
      en: 'Your session has expired. Please log in again to continue using the application.',
      'pt-BR':
        'Sua sessão expirou. Por favor, faça o login novamente para continuar usando o aplicativo.',
      es: 'Tu sesión ha caducado. Por favor, inicia sesión de nuevo para seguir utilizando la aplicación.'
    }
  },
  needsPermission: {
    type: 'error',
    title: {
      en: 'Restricted Access for Testers',
      'pt-BR': 'Acesso Restrito a Testadores',
      es: 'Acceso Restringido para Probadores'
    },
    text: {
      en: 'Sorry, you do not have permission to access this application. It is currently in testing phase, and access is restricted to authorized testers.',
      'pt-BR':
        'Desculpe, você não possui autorização para acessar este aplicativo. Atualmente, ele está em fase de testes e o acesso é restrito aos testadores autorizados.',
      es: 'Lo siento, no tienes permiso para acceder a esta aplicación. Actualmente se encuentra en fase de pruebas y el acceso está restringido a probadores autorizados.'
    }
  }
} as const

const authStatesKeys = Object.keys(authStates)

const HomeView = ({}: HomeViewProps) => {
  const router = useRouter()
  const i18n = useI18n()
  const locale = useLocale()
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
            title={authStateFeedbackData.title[locale]}
            description={authStateFeedbackData.text[locale]}
            buttons={[
              {
                children: i18n.CLOSE,
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
