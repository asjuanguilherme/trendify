import { CSSProperties, ReactNode } from 'react'
import InfoCircleIcon from '../icons/InfoCircle'
import * as S from './styles'

export type HelperBoxProps = {
  title?: string
  children?: ReactNode
  fillWidth?: boolean
  className?: string
  style?: CSSProperties
}

const HelperBox = ({ title, children, ...props }: HelperBoxProps) => {
  return (
    <S.Wrapper {...props}>
      <S.IconWrapper>
        <InfoCircleIcon />
      </S.IconWrapper>
      <S.Content>
        {title && <S.Title>{title}</S.Title>}
        {children}
      </S.Content>
    </S.Wrapper>
  )
}

export default HelperBox
