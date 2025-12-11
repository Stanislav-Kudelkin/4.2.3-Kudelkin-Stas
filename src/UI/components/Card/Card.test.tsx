import { render, screen } from '@testing-library/react'
import { Card } from './Card'
import { describe, it, expect } from 'vitest'

describe('Card', () => {
  it('рендерит children внутри карточки', () => {
    render(
      <Card>
        <span data-testid="content">Card Content</span>
      </Card>
    )

    expect(screen.getByTestId('content')).toBeInTheDocument()
  })
})
