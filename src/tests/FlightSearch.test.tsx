import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FlightSearch } from '../components/FlightSearch'

describe('FlightSearch', () => {
  it('renders search input and button', () => {
    const mockOnSearch = vi.fn()
    render(<FlightSearch onSearch={mockOnSearch} />)
    
    expect(screen.getByPlaceholderText(/search by flight number/i)).toBeDefined()
    expect(screen.getByText(/search/i)).toBeDefined()
  })

  it('calls onSearch with input value when form is submitted', () => {
    const mockOnSearch = vi.fn()
    render(<FlightSearch onSearch={mockOnSearch} />)
    
    const input = screen.getByPlaceholderText(/search by flight number/i)
    const searchButton = screen.getByText(/search/i)
    
    fireEvent.change(input, { target: { value: 'AA123' } })
    fireEvent.click(searchButton)
    
    expect(mockOnSearch).toHaveBeenCalledWith('AA123')
  })
})