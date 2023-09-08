import { MouseEventHandler } from 'react'
import * as S from './styles'
import { COLOR_HEXADECIMAL_REGEX } from 'utils/regex'

export type ColorOptionProps = {
  hexColor: string
  onClick?: MouseEventHandler
}

const ColorOption = ({ hexColor, onClick }: ColorOptionProps) => {
  if (hexColor.length < 6)
    throw new Error('hexColor prop must contain at least 6 characters')
  if (hexColor.length > 8)
    throw new Error('hexColor prop must contain up to 8 characters')
  if (!COLOR_HEXADECIMAL_REGEX.test(hexColor))
    throw new Error('hexColor prop is invalid')

  return <S.Wrapper onClick={onClick} $color={hexColor}></S.Wrapper>
}

export default ColorOption
