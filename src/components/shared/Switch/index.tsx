import { ChangeEventHandler } from 'react'
import * as S from './styles'

export type SwitchProps = {
  checked: boolean
  onChange: ChangeEventHandler
}

const Switch = ({ checked, onChange }: SwitchProps) => {
  return (
    <S.Wrapper>
      <input type="checkbox" checked={checked} onChange={onChange} hidden />
      <S.SwitchTrack>
        <S.SwitchDot />
      </S.SwitchTrack>
    </S.Wrapper>
  )
}

export default Switch
