import * as S from './styles'
import { COLOR_HEXADECIMAL_REGEX } from 'utils/regex'
import { ButtonProps } from '../Button'

export type ColoredButtonProps = ButtonProps & {
  hexColor: string
  active: boolean
}

const ColoredButton = ({ hexColor, active, ...props }: ColoredButtonProps) => {
  if (hexColor.length < 6)
    throw new Error('hexColor prop must contain at least 6 characters')
  if (hexColor.length > 8)
    throw new Error('hexColor prop must contain up to 8 characters')
  if (!COLOR_HEXADECIMAL_REGEX.test(hexColor))
    throw new Error('hexColor prop is invalid')

  return <S.Wrapper $color={hexColor} $active={active} {...props} />
}

export default ColoredButton
