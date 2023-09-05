export const breakpoints = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tabletS: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1200,
  desktopL: 1536
}

export const screens = {
  mobileS: `@media screen and (min-width: ${breakpoints.mobileS}px)`,
  mobileM: `@media screen and (min-width: ${breakpoints.mobileM}px)`,
  mobileL: `@media screen and (min-width: ${breakpoints.mobileL}px)`,
  tabletS: `@media screen and (min-width: ${breakpoints.tabletS}px)`,
  tablet: `@media screen and (min-width: ${breakpoints.tablet}px)`,
  laptop: `@media screen and (min-width: ${breakpoints.laptop}px)`,
  desktop: `@media screen and (min-width: ${breakpoints.desktop}px)`,
  desktopL: `@media screen and (min-width: ${breakpoints.desktopL}px)`
} as const
