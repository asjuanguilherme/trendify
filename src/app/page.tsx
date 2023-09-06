'use-client'

import React from 'react'
import Button from 'components/shared/Button'
import Section from 'components/shared/Section'
import SpotifyLogo from 'components/shared/icons/SpotifyLogo'

const page = () => {
  return (
    <div>
      <Section title="Descubra seu topify">
        <p>Suas músicas em destaque, de um jeito rápido, fácil elegante.</p>
        <Button fillWidth style={{ marginTop: '1.5rem' }}>
          Entrar com{' '}
          <SpotifyLogo style={{ fontSize: '5rem', marginLeft: '-.5rem' }} />
        </Button>
      </Section>
    </div>
  )
}

export default page
