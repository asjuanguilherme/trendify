import * as S from './styles'
import { ReactNode } from 'react'
import Button, { ButtonProps } from '../Button'
import InfoIcon from '../icons/Info'
import TriangleExclamationIcon from '../icons/TriangleExclamation'
import XmarkIcon from '../icons/Xmark'
import Spinner from '../Spinner'
import LockIcon from '../icons/Lock'
import CheckIcon from '../icons/Check'

export type StateType =
  | 'info'
  | 'error'
  | 'loading'
  | 'warning'
  | 'success'
  | 'needsPermission'

export type StateModalContentProps = {
  type?: StateType
  title?: ReactNode
  description?: ReactNode
  buttons?: (ButtonProps & { customRender?: ReactNode })[]
}

const stateIcons: Record<StateType, JSX.Element> = {
  info: <InfoIcon />,
  error: <XmarkIcon />,
  loading: <Spinner />,
  success: <CheckIcon />,
  warning: <TriangleExclamationIcon />,
  needsPermission: <LockIcon />
}

const StateModalContent = ({
  type = 'info',
  title,
  description,
  buttons
}: StateModalContentProps) => {
  return (
    <S.Wrapper>
      <S.Icon type={type}>{stateIcons[type]}</S.Icon>
      {title && <S.Title>{title}</S.Title>}
      {description && <S.Message>{description}</S.Message>}
      {buttons && buttons.length > 0 && (
        <S.ActionButtons>
          {buttons.map((button, index) => {
            if (button?.customRender) return button.customRender

            return <Button key={index} {...button} />
          })}
        </S.ActionButtons>
      )}
    </S.Wrapper>
  )
}

export default StateModalContent
