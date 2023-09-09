import AppHead from 'components/infra/AppHead'
import ExternalLinkWithIcon from 'components/shared/ExternalLinkWithIcon'
import BasicPageView from 'components/view/BasicPage'
import { withGlobalData } from 'hoc/withGlobalData'
import { useI18n } from 'hooks/useI18n'
import styled from 'styled-components'

const tagByContentType = {
  HEADER: 'h1',
  PARAGRAPH: 'p',
  LINK: ExternalLinkWithIcon
} as const

const Element = styled.span``

const PrivacyPolicyPage = () => {
  const i18n = useI18n()

  return (
    <>
      <AppHead
        title={i18n.PRIVACY_POLICY_PAGE.TITLE}
        description={i18n.PRIVACY_POLICY_PAGE.SEO_DESCRIPTION}
        pathname="/privacy-policy"
      />
      <BasicPageView>
        {i18n.PRIVACY_POLICY_PAGE.CONTENT.map(item => (
          // @ts-ignore
          <Element
            key={item.TEXT}
            as={tagByContentType[item.TYPE as 'HEADER']}
            href={item.URL}
          >
            {item.TEXT}
          </Element>
        ))}
      </BasicPageView>
    </>
  )
}

export const getServerSideProps = withGlobalData(async () => {
  return {
    props: {}
  }
})

export default PrivacyPolicyPage
