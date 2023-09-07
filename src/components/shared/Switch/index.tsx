import { ChangeEventHandler } from 'react'
import * as S from './styles'

export type SwitchProps = {
  label?: string
  labelPosition?: 'start' | 'end'
  checked: boolean
  onChange: ChangeEventHandler
}

const Switch = ({
  label,
  labelPosition = 'end',
  checked,
  onChange
}: SwitchProps) => {
  return (
    <S.Wrapper>
      {labelPosition === 'start' && label}
      <input type="checkbox" checked={checked} onChange={onChange} hidden />
      <S.SwitchTrack>
        <S.SwitchDot />
      </S.SwitchTrack>
      {labelPosition === 'end' && label}
    </S.Wrapper>
  )
}

export default Switch
