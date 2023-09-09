import { CSSProperties, ReactNode } from 'react'
import * as S from './styles'

export type HtmlContentProps = {
  children?: ReactNode
  html?: string
  className?: string
  style?: CSSProperties
}

const HtmlContent = ({ html, children, ...props }: HtmlContentProps) => {
  if (html)
    return (
      <S.Wrapper dangerouslySetInnerHTML={{ __html: html || '' }} {...props} />
    )

  return <S.Wrapper {...props}>{children}</S.Wrapper>
}

export default HtmlContent
