import { ChangeEventHandler } from 'react'
import * as S from './styles'
import { LayerIndex } from '../../../../styled'

export type SwitchProps = {
  checked: boolean
  onChange: ChangeEventHandler
  label?: string
  labelPosition?: 'start' | 'end'
  layer?: LayerIndex
}

const Switch = ({
  label,
  labelPosition = 'end',
  checked,
  onChange,
  layer = 1
}: SwitchProps) => {
  return (
    <S.Wrapper $layer={layer}>
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
