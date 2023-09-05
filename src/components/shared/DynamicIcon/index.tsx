import createIconComponent, {
  IconComponentProps
} from 'components/shared/icons/utils/createIconComponent'

type DynamicIconProps = IconComponentProps & {
  viewBox: string
  svgChildrenContent: string
}

const DynamicIcon = ({
  viewBox,
  svgChildrenContent,
  ...props
}: DynamicIconProps) => {
  const content = <g dangerouslySetInnerHTML={{ __html: svgChildrenContent }} />

  const Icon = createIconComponent({
    viewBox,
    content
  })

  return <Icon {...props} />
}

export default DynamicIcon
