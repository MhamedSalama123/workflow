import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HazardBanner, StatusLight, TextField } from './ui'

describe('StatusLight', () => {
  it('always shows a text label, never only a color', () => {
    render(<StatusLight light="fault" label="Machine down" />)
    expect(screen.getByText('Machine down')).toBeInTheDocument()
  })
})

describe('TextField', () => {
  it('links the label and the error message to the input', () => {
    render(<TextField label="Asset" error="Unknown asset" />)
    const input = screen.getByLabelText('Asset')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription('Unknown asset')
  })
})

describe('HazardBanner', () => {
  it('is announced as an alert', () => {
    render(<HazardBanner title="Safety: technician only">Keep away</HazardBanner>)
    expect(screen.getByRole('alert')).toHaveTextContent('Keep away')
  })
})
