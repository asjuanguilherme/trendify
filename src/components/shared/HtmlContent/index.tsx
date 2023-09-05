import { ReactNode } from 'react'
import * as S from './styles'

export type HtmlContentProps = { children?: ReactNode; html?: string }

const HtmlContent = ({ html, children }: HtmlContentProps) => {
  if (html)
    return <S.Wrapper dangerouslySetInnerHTML={{ __html: html || '' }} />

  return <S.Wrapper>{children}</S.Wrapper>
}

export default HtmlContent
