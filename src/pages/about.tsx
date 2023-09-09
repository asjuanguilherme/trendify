import AppHead from 'components/infra/AppHead'
import ExternalLinkWithIcon from 'components/shared/ExternalLinkWithIcon'
import BasicPageView from 'components/view/BasicPage'
import { DEVELOPER_WEBSITE_URL } from 'config/developerWebsiteURL'
import { withGlobalData } from 'hoc/withGlobalData'
import { useI18n } from 'hooks/useI18n'

const PrivacyPolicyPage = () => {
  const i18n = useI18n()

  return (
    <>
      <AppHead
        title={i18n.ABOUT_PAGE.TITLE}
        description={i18n.ABOUT_PAGE.SEO_DESCRIPTION}
        pathname="/about"
      />

      <BasicPageView>
        <h1>{i18n.ABOUT_PAGE.TITLE}</h1>
        <p>{i18n.ABOUT_PAGE.SEO_DESCRIPTION}</p>

        <br />

        <h2>{i18n.ABOUT_PAGE.HOW_IT_WORKS.TITLE}</h2>

        <h3>{i18n.ABOUT_PAGE.HOW_IT_WORKS.SPOTIFY_CONNECTION.TITLE}</h3>
        <p>{i18n.ABOUT_PAGE.HOW_IT_WORKS.SPOTIFY_CONNECTION.DESCRIPTION}</p>

        <h3>{i18n.ABOUT_PAGE.HOW_IT_WORKS.LIST_GENERATION.TITLE}</h3>
        <p>{i18n.ABOUT_PAGE.HOW_IT_WORKS.LIST_GENERATION.DESCRIPTION}</p>

        <h3>{i18n.ABOUT_PAGE.HOW_IT_WORKS.EXPLORATION_AND_SHARING.TITLE}</h3>
        <p>
          {i18n.ABOUT_PAGE.HOW_IT_WORKS.EXPLORATION_AND_SHARING.DESCRIPTION}
        </p>

        <br />

        <h2>{i18n.ABOUT_PAGE.DEVELOPER_MESSAGE.TITLE}</h2>

        <p>{i18n.ABOUT_PAGE.DEVELOPER_MESSAGE.INTRODUCTION}</p>

        <p>{i18n.ABOUT_PAGE.DEVELOPER_MESSAGE.HOPE_YOU_ENJOY} </p>

        <p>{i18n.ABOUT_PAGE.DEVELOPER_MESSAGE.CONTACT_ME}.</p>

        <ExternalLinkWithIcon href={DEVELOPER_WEBSITE_URL}>
          Juan Guilherme Website
        </ExternalLinkWithIcon>
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
