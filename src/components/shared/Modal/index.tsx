import * as S from './styles'
import { ReactNode } from 'react'
import XMarkIcon from 'components/shared/icons/Xmark'
import Button from 'components/shared/Button'
import { LayerIndex } from '../../../../styled'

export type ModalVariant = 'default' | 'discret'

export type ModalComponentProps = {
  onClose: () => void
  content?: ReactNode
  title?: string
  opened?: boolean
  width?: number
  positionY?: string
  footer?: ReactNode
  showX?: boolean
  closeOnBlur?: boolean
  variant?: ModalVariant
  layer?: LayerIndex
}

const Modal = ({
  title,
  content,
  opened = true,
  width = 350,
  positionY = '0',
  footer,
  showX = true,
  closeOnBlur = true,
  onClose,
  variant = 'default',
  layer = 0
}: ModalComponentProps) => {
  return (
    <S.Wrapper
      onClick={closeOnBlur ? onClose : undefined}
      opened={opened}
      variant={variant}
    >
      <S.Box
        width={width}
        onClick={e => e.stopPropagation()}
        hasTitle={Boolean(title)}
        positionY={positionY}
        $layer={layer}
      >
        {(title || showX) && (
          <S.BoxHeader>
            <S.Title>{title}</S.Title>
            {showX && (
              <Button onlyIcon variant="basic" onClick={onClose}>
                <XMarkIcon />
              </Button>
            )}
          </S.BoxHeader>
        )}
        <S.BoxContent>{content}</S.BoxContent>
        {footer && <S.BoxFooter>{footer}</S.BoxFooter>}
      </S.Box>
    </S.Wrapper>
  )
}

export default Modal
