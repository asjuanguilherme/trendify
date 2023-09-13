import styled, { css } from 'styled-components'
import { font, layout, spacing, zIndex } from 'styles/designSystemConfig'
import DefaultContainer from 'components/shared/Container'
import { breakpoints, screens } from 'styles/screens'
import { topItemsGeneratorConfig } from 'config/topItemsGenerator'
import { rem } from 'polished'
import { appLayoutConfig } from 'components/layout/styles'

export const SharingButtons = styled.div`
  position: fixed;
  z-index: ${zIndex.navbar};
  top: ${appLayoutConfig.headerHeight.mobile};
  left: 0;
  width: 100%;
  display: flex;
  gap: ${spacing.components.medium};
  padding: ${spacing.components.medium} ${layout.gutter};

  button {
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
  }

  ${screens.laptop} {
    padding: ${layout.gutter};
    position: static;
    margin-top: ${spacing.components.medium};
    padding: 0;

    button {
      box-shadow: initial;
    }
  }
`

export const VisibleTopItemsBox = styled.div<{ $isMaximized: boolean }>`
  padding-top: ${rem(45)};

  ${screens.laptop} {
    padding-top: 0;
  }

  & > .userTopItemsBox {
    zoom: 0.55;
  }

  @media screen and (min-height: 600px) {
    & > .userTopItemsBox {
      zoom: 0.6;
    }
  }

  @media screen and (min-height: 700px) {
    & > .userTopItemsBox {
      zoom: 0.65;
    }
  }

  ${screens.tabletS} {
    & > .userTopItemsBox {
      zoom: initial;
    }
  }

  ${screens.laptop} {
    position: fixed;
    pointer-events: none;
    a {
      pointer-events: all;
    }
    & > ${SharingButtons} {
      pointer-events: all;
    }
  }
`

export const HiddenTopItemsBox = styled.div`
  width: ${topItemsGeneratorConfig.boxWidth}px;
  position: fixed;
  z-index: -1;
  left: -500%;
  top: -500%;
`

export const LoadingBoard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.sections.medium};
  font-size: ${font.sizes.xxlarger};
`

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.components.small};
`
export const Container = styled(DefaultContainer)`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sections.smaller};

  ${screens.laptop} {
    display: grid;
    flex-direction: initial;
    grid-template-columns: 1fr ${topItemsGeneratorConfig.boxWidth}px;
  }
`

export const Wrapper = styled.div`
  padding: ${spacing.sections.smaller} 0;
  height: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 200px;

  ${screens.laptop} {
    padding-bottom: 0px;
    display: block;
  }
`
