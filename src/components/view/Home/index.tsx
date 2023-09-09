import * as S from './styles'
import ButtonLink from 'components/shared/ButtonLink'
import SpotifyLogo from 'components/shared/SpotifyLogo'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useModals } from 'contexts/ModalContext'
import StateModalContent, {
  StateModalContentProps,
  StateType
} from 'components/shared/StateModalContent'
import ModalIdentifiers from 'contexts/ModalContext/identifiers'
import { useI18n } from 'hooks/useI18n'
import { useLocale } from 'hooks/useLocale'
import { AUTH_STATES_ENUM } from 'hoc/withGlobalData'

export type HomeViewProps = {}

const statusTypeByStateName: Record<AUTH_STATES_ENUM, StateType> = {
  needsPermission: 'error',
  sessionExpired: 'warning',
  unlogged: 'success'
}

const HomeView = ({}: HomeViewProps) => {
  const router = useRouter()
  const i18n = useI18n()
  const locale = useLocale()
  const { addModal, closeModal } = useModals()

  useEffect(() => {
    const queryKeys = Object.keys(router.query)
    const authStateName = queryKeys[0] as AUTH_STATES_ENUM

    if (Object.keys(AUTH_STATES_ENUM).includes(authStateName)) {
      const authStateFeedbackData = i18n.AUTH_STATUS_FEEDBACK[authStateName]

      addModal({
        identifier: ModalIdentifiers.AUTH_STATE_MODAL,
        showX: false,
        content: (
          <StateModalContent
            type={statusTypeByStateName[authStateName]}
            title={authStateFeedbackData.TITLE}
            description={authStateFeedbackData.DESCRIPTION}
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
