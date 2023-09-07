import { ChangeEventHandler, useRef } from 'react'
import * as S from './styles'

export type ColorPickerProps = {
  value?: string
  onChange?: (value: string) => void
}

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  if (!value) throw new Error('Color picker must start with a value')

  return (
    <S.Wrapper>
      <S.SelectedColor $color={value} onClick={() => inputRef.current?.click()}>
        <input
          type="color"
          value={value}
          onChange={e => (onChange ? onChange(e.target.value) : undefined)}
          ref={inputRef}
          style={{ display: 'none' }}
        />
      </S.SelectedColor>
    </S.Wrapper>
  )
}

export default ColorPicker
