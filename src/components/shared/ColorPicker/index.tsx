import { useRef } from 'react'
import * as S from './styles'

export type ColorPickerProps = {
  label?: string
  labelPosition?: 'start' | 'end'
  value?: string
  onChange?: (value: string) => void
}

const ColorPicker = ({
  label,
  labelPosition = 'end',
  value,
  onChange
}: ColorPickerProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  if (!value) throw new Error('Color picker must start with a value')

  return (
    <S.Wrapper>
      {labelPosition === 'start' && label}
      <S.SelectedColor $color={value} onClick={() => inputRef.current?.click()}>
        <input
          type="color"
          value={value}
          onChange={e => (onChange ? onChange(e.target.value) : undefined)}
          ref={inputRef}
          style={{ display: 'none' }}
        />
      </S.SelectedColor>
      {labelPosition === 'end' && label}
    </S.Wrapper>
  )
}

export default ColorPicker
