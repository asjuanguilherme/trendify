import { useRef, useState } from 'react'
import * as S from './styles'
import { useI18n } from 'hooks/useI18n'
import { topItemsGeneratorConfig } from 'config/topItemsGenerator'
import Button from '../Button'
import { GeneratorSettingsProps } from 'components/view/Generator'
import ColoredButton from '../ColoredButton'
import { trackItemStyleVariantOptions } from '../TrackItem/utils'
import Switch from '../Switch'
import { I18nObject } from 'i18n'
import useScreen from 'hooks/useScreen'
import { breakpoints } from 'styles/screens'

const tabs = {
  BASIC: {
    render: (props: GeneratorSettingsProps, i18n: I18nObject) => (
      <>
        <S.BoxSection>
          <S.BoxSectionTitle>
            {i18n.GENERATOR_PAGE.GENERATOR_SETTINGS.LIMIT_LABEL}
          </S.BoxSectionTitle>
          {topItemsGeneratorConfig.limitOptions.map(option => (
            <S.SettingsButton
              key={option}
              onClick={() => props.setLimit(option)}
              $active={option === props.limit}
              size="smaller"
              $layer={0}
            >
              {option} {i18n.ITEMS}
            </S.SettingsButton>
          ))}
        </S.BoxSection>
        <S.BoxSection>
          <S.BoxSectionTitle>
            {i18n.GENERATOR_PAGE.GENERATOR_SETTINGS.TYPE_LABEL}
          </S.BoxSectionTitle>
          {Object.values(topItemsGeneratorConfig.typeOptions).map(key => (
            <S.SettingsButton
              key={key}
              onClick={() => props.setType(key)}
              $active={key === props.type}
              size="smaller"
              $layer={0}
            >
              {i18n.TYPE_OPTIONS[key]}
            </S.SettingsButton>
          ))}
        </S.BoxSection>
        <S.BoxSection>
          <S.BoxSectionTitle>
            {i18n.GENERATOR_PAGE.GENERATOR_SETTINGS.TIME_RANGE_LABEL}
          </S.BoxSectionTitle>
          {Object.values(topItemsGeneratorConfig.timeOptions).map(key => (
            <S.SettingsButton
              key={key}
              onClick={() => props.setTimeRange(key)}
              $active={key === props.timeRange}
              size="smaller"
              $layer={0}
            >
              {i18n.TIME_OPTIONS[key].title}
            </S.SettingsButton>
          ))}
        </S.BoxSection>
      </>
    )
  },
  COLOR: {
    render: (props: GeneratorSettingsProps, i18n: I18nObject) => (
      <>
        <S.BoxSection>
          <S.ColorOptions>
            {topItemsGeneratorConfig.suggestedColorsOptions.map(colorOption => (
              <ColoredButton
                key={colorOption}
                hexColor={colorOption}
                onClick={() => props.setColor(colorOption)}
                active={colorOption === props.color}
                size="smaller"
                onlyIcon
              />
            ))}
          </S.ColorOptions>
        </S.BoxSection>
        <S.BoxSection>
          <Button as="label" size="smaller" fillWidth>
            {i18n.CUSTOM_COLOR}
            <input
              value={props.color}
              onChange={e => props.setColor(e.target.value)}
              type="color"
              hidden
            />
          </Button>
        </S.BoxSection>
      </>
    )
  },
  STYLE: {
    render: (props: GeneratorSettingsProps, i18n: I18nObject) => (
      <>
        <S.BoxSection>
          <S.BoxSectionTitle>
            {i18n.GENERATOR_PAGE.GENERATOR_SETTINGS.ITEMS_STYLE}
          </S.BoxSectionTitle>
          {trackItemStyleVariantOptions.map(item => (
            <Button
              key={item.value}
              onClick={() =>
                props.setSelectedItemsStyle(item.value as 'spotify')
              }
              variant={
                props.selectedItemsStyle === item.value ? 'filled' : 'basic'
              }
              size="smaller"
              layer={0}
            >
              {item.label}
            </Button>
          ))}
        </S.BoxSection>
        <S.BoxSection>
          <S.Switches>
            <Switch
              label={
                i18n.GENERATOR_PAGE.GENERATOR_SETTINGS.SHOW_BACKGROUND_IMAGE
              }
              checked={props.enableBackgroundImage}
              onChange={() => props.setEnableBackgroundImage(state => !state)}
              layer={0}
            />
            <Switch
              label={i18n.GENERATOR_PAGE.GENERATOR_SETTINGS.ENABLE_GRADIENT}
              checked={props.enableGradient}
              onChange={() => props.setEnableGradient(state => !state)}
              layer={0}
            />
            <Switch
              label={i18n.GENERATOR_PAGE.GENERATOR_SETTINGS.BLUR_BACKGROUND}
              checked={props.enableBlur}
              onChange={() => props.setEnableBlur(state => !state)}
              layer={0}
            />
          </S.Switches>
        </S.BoxSection>
      </>
    )
  },
  EXTRA: {
    render: (props: GeneratorSettingsProps, i18n: I18nObject) => (
      <>
        <S.Switches>
          <Switch
            label={i18n.GENERATOR_PAGE.GENERATOR_SETTINGS.SHOW_PROFILE}
            checked={props.showProfileInfo}
            onChange={() => props.setShowProfileInfo(state => !state)}
            layer={0}
          />
          <Switch
            label={i18n.GENERATOR_PAGE.GENERATOR_SETTINGS.LARGE_TITLE}
            checked={props.titleType === 'large'}
            onChange={() =>
              props.setTitleType(state =>
                state === 'short' ? 'large' : 'short'
              )
            }
            layer={0}
          />
          <Switch
            label={i18n.GENERATOR_PAGE.GENERATOR_SETTINGS.ROUND_CORNERS}
            checked={props.roundedCorners}
            onChange={() => props.setRoundedCorners(state => !state)}
            layer={0}
          />
          <Switch
            label={i18n.GENERATOR_PAGE.GENERATOR_SETTINGS.NUMBERED_TOP_3}
            checked={props.enableBadgeHightlights}
            onChange={() => props.setEnableBadgeHighlights(state => !state)}
            layer={0}
          />
        </S.Switches>
      </>
    )
  }
}

const GeneratorSettings = (props: GeneratorSettingsProps) => {
  const i18n = useI18n()
  const screen = useScreen()

  const [currentTab, setCurrentTab] = useState<keyof typeof tabs>('BASIC')

  const isLaptopUp = screen.width > breakpoints.laptop

  return (
    <S.Wrapper>
      {!isLaptopUp && (
        <S.TabNavigation>
          <ul>
            {Object.keys(tabs).map(tabName => (
              <li key={tabName}>
                <S.SettingsButton
                  $layer={1}
                  $active={tabName === currentTab}
                  onClick={() => setCurrentTab(tabName as keyof typeof tabs)}
                >
                  {
                    i18n.GENERATOR_PAGE.GENERATOR_SETTINGS[
                      `${tabName as keyof typeof tabs}_TAB`
                    ]
                  }
                </S.SettingsButton>
              </li>
            ))}
          </ul>
        </S.TabNavigation>
      )}
      {isLaptopUp ? (
        Object.keys(tabs).map(item => (
          <S.Box key={item}>
            <S.BoxTitle>
              {
                i18n.GENERATOR_PAGE.GENERATOR_SETTINGS[
                  `${item as keyof typeof tabs}_TAB`
                ]
              }
            </S.BoxTitle>
            {tabs[item as keyof typeof tabs].render(props, i18n)}
          </S.Box>
        ))
      ) : (
        <S.Box>{tabs[currentTab].render(props, i18n)}</S.Box>
      )}
    </S.Wrapper>
  )
}

export default GeneratorSettings
