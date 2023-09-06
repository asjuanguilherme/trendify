'use client'

import React from 'react'
import Section from 'components/shared/Section'
import SpotifyLogo from 'components/shared/icons/SpotifyLogo'
import ButtonLink from 'components/shared/ButtonLink'

const RootPage = async () => {
  return (
    <div>
      <Section title="Descubra seu topify">
        <p>Suas músicas em destaque, de um jeito rápido, fácil elegante.</p>
        <ButtonLink fillWidth style={{ marginTop: '1.5rem' }} href="/login">
          Entrar com
          <SpotifyLogo style={{ fontSize: '5rem', marginLeft: '-.5rem' }} />
        </ButtonLink>
      </Section>
    </div>
  )
}

export default RootPage
