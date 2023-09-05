import * as S from './styles'
import {
  CSSProperties,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

// Types
import { LayerIndex } from '../../../../styled'

// Utils
import useScreen from 'hooks/useScreen'
import { breakpoints } from 'styles/screens'

// Components
import Spinner from '../Spinner'
import TextInput from '../TextInput'
import ChevronUpIcon from '../icons/ChevronUp'
import ChevronDownIcon from '../icons/ChevronDown'
import { IconComponent } from '../icons/utils/createIconComponent'
import MagIcon from '../icons/Mag'

export type Option = {
  label: string
  value: string | null
  icon?: IconComponent
}

export type OptionsBoxConfig = {
  maxHeight?: number
  closeAfterSelectOption?: boolean
}

export type DropdownProps = {
  label?: string
  placeholder?: string
  options?: Option[] | null
  onValueChange?: (value: Option['value']) => void
  onOptionClick?: (value: Option['value']) => void
  initialValue?: Option['value']
  selectedOptionValue?: Option['value']
  layer?: LayerIndex
  boxOptionsConfig?: OptionsBoxConfig
  fillWidth?: boolean
  className?: string
  style?: CSSProperties
  showChevron?: boolean
  onlyIcon?: IconComponent
  disabled?: boolean
  loading?: boolean
  enableSearch?: boolean
}

const Dropdown = ({
  label,
  initialValue = null,
  selectedOptionValue = null,
  placeholder,
  options,
  onValueChange,
  onOptionClick,
  layer = 1,
  boxOptionsConfig,
  showChevron = true,
  onlyIcon,
  disabled,
  loading,
  enableSearch,
  ...props
}: DropdownProps) => {
  const [optionsOpened, setOptionsOpened] = useState(false)
  const [uncontrolledSelectedOptionValue, setUncontrolledSelectedOptionValue] =
    useState<Option['value']>(initialValue)
  const [searchValue, setSearchValue] = useState('')
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const screen = useScreen()
  const isTabletUp = screen.width >= breakpoints.tablet

  const isControlled = Boolean(selectedOptionValue)

  const selectedOptionData = useMemo(() => {
    if (!options || options.length === 0) return null

    return options.filter(option => {
      if (isControlled) {
        return option.value === selectedOptionValue
      }

      return option.value === uncontrolledSelectedOptionValue
    })[0]
  }, [
    isControlled,
    options,
    uncontrolledSelectedOptionValue,
    selectedOptionValue
  ])

  const displayableOptions = useMemo(() => {
    if (!enableSearch || !searchValue) return options

    return options?.filter(option => {
      const regex = new RegExp(searchValue, 'i')
      return regex.test(option.label)
    })
  }, [options, searchValue, enableSearch])

  const handleButtonClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      setOptionsOpened(state => !state)
    },
    [setOptionsOpened]
  )

  const handleClickOnOptionsBoxWrapper = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (!isTabletUp) setOptionsOpened(false)
    },
    [isTabletUp, setOptionsOpened]
  )

  const handleOptionClick = useCallback(
    (e: MouseEvent<HTMLLIElement>, value: Option['value']) => {
      e.stopPropagation()

      onValueChange && onValueChange(value)
      setUncontrolledSelectedOptionValue(value)

      if (boxOptionsConfig?.closeAfterSelectOption) setOptionsOpened(false)

      onOptionClick && onOptionClick(value)
    },
    [boxOptionsConfig?.closeAfterSelectOption, onValueChange, onOptionClick]
  )

  // Close dropdown when user clicks out the dropdown
  useEffect(() => {
    const bodyEl = document.querySelector('body')
    bodyEl?.addEventListener('click', e => {
      if (e.target !== buttonRef.current) setOptionsOpened(false)
    })
  }, [setOptionsOpened])

  return (
    <S.Wrapper {...props}>
      {label && <S.Label>{label}</S.Label>}
      <S.Button
        setRef={buttonRef}
        disabled={disabled}
        fillWidth
        onClick={handleButtonClick}
        variant="basic"
        layer={layer}
      >
        <S.DropdownLabelWrapper>
          {!onlyIcon && selectedOptionData?.icon && <selectedOptionData.icon />}
          {!onlyIcon && (selectedOptionData?.label || placeholder)}
        </S.DropdownLabelWrapper>
        <S.DropdownSuffixWrapper>
          {loading && <Spinner />}
          {showChevron &&
            (optionsOpened ? <ChevronUpIcon /> : <ChevronDownIcon />)}
        </S.DropdownSuffixWrapper>
      </S.Button>

      <S.OptionsBoxWrapper
        opened={optionsOpened}
        onClick={handleClickOnOptionsBoxWrapper}
      >
        <S.OptionsBox
          {...boxOptionsConfig}
          opened={optionsOpened}
          layer={layer}
        >
          {enableSearch && (
            <TextInput
              prefix={<MagIcon />}
              placeholder="Search here"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onClick={e => {
                e.stopPropagation()
              }}
              fillWidth
            />
          )}
          <S.OptionsList>
            {displayableOptions?.map(option => (
              <S.Option
                key={option.value}
                onClick={e => handleOptionClick(e, option.value)}
                selected={
                  option.value ===
                  (isControlled
                    ? selectedOptionValue!
                    : uncontrolledSelectedOptionValue)
                }
              >
                {option.icon && <option.icon />}
                {option.label}
              </S.Option>
            ))}
          </S.OptionsList>
        </S.OptionsBox>
      </S.OptionsBoxWrapper>
    </S.Wrapper>
  )
}

export default Dropdown
