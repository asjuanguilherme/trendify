import {
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
  MutableRefObject,
  ReactNode,
  useEffect,
  useState
} from 'react'
import * as S from './styles'
import { LayerIndex } from '../../../../styled'
import { ButtonProps } from '../Button'
import TriangleExclamationIcon from '../icons/TriangleExclamation'

export type TextInputProps = {
  label?: string
  sufix?: ReactNode
  prefix?: ReactNode
  fillWidth?: boolean
  layer?: LayerIndex
  type?: 'text' | 'email' | 'password' | 'phone'
  placeholder?: string
  button?: ButtonProps
  value?: string
  disabled?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
  setRef?: MutableRefObject<HTMLInputElement | null>
  onFocused?: (isFocused: boolean) => void
  onClick?: MouseEventHandler
  error?: string
} & {
  [label: string]: any
}

const TextInput = ({
  label,
  prefix,
  sufix,
  fillWidth,
  layer = 1,
  button,
  setRef,
  onFocused,
  error,
  ...props
}: TextInputProps) => {
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    onFocused && onFocused(focused)
  }, [onFocused, focused])

  return (
    <S.Wrapper fillWidth={fillWidth}>
      {label && <S.Label>{label}</S.Label>}
      <S.FieldWrapper
        layer={layer}
        focused={focused}
        hasError={Boolean(error)}
        disabled={props.disabled}
      >
        {prefix && <S.Prefix>{prefix}</S.Prefix>}
        <S.Input
          {...props}
          layer={layer}
          hasPrefix={Boolean(prefix)}
          hasSufix={Boolean(sufix)}
          ref={setRef}
          onFocus={e => {
            setFocused(true)
            props.onFocus && props.onFocus(e)
          }}
          onBlur={e => {
            setFocused(false)
            props.onBlur && props.onBlur(e)
          }}
        />
        {sufix && <S.Sufix>{sufix}</S.Sufix>}
        {button && <S.Button {...button} />}
      </S.FieldWrapper>
      {error && (
        <S.Error>
          <TriangleExclamationIcon />
          {error}
        </S.Error>
      )}
    </S.Wrapper>
  )
}

export default TextInput
