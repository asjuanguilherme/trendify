import * as S from './styles'
import { CSSProperties, ReactNode } from 'react'
import Container from 'components/shared/Container'
import ArrowLeftIcon from 'components/shared/icons/ArrowLeft'
import HtmlContent from 'components/shared/HtmlContent'
import ButtonLink from 'components/shared/ButtonLink'

export type BasicPageViewProps = {
  children: ReactNode
  showReturn?: boolean
  className?: string
  style?: CSSProperties
}

const BasicPageView = ({
  children,
  showReturn = true,
  ...props
}: BasicPageViewProps) => {
  return (
    <S.Wrapper {...props}>
      <Container>
        {showReturn && (
          <S.Return>
            <ButtonLink href="/" size="small">
              <ArrowLeftIcon />
              Voltar
            </ButtonLink>
          </S.Return>
        )}
      </Container>
      <Container>
        <HtmlContent>{children}</HtmlContent>
      </Container>
    </S.Wrapper>
  )
}

export default BasicPageView
