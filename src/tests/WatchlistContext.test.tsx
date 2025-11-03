import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { WatchlistProvider, useWatchlist } from '../contexts/WatchlistContext'
import type { Flight } from '../types/flight'

const wrapper = ({ children }: { children: React.ReactNode }) => (
	<WatchlistProvider>{children}</WatchlistProvider>
)

const sampleFlight: Flight = {
	id: 'AA123-20241031',
	flightNumber: 'AA123',
	airline: 'American Airlines',
	origin: { code: 'JFK', name: 'John F. Kennedy International', city: 'New York' },
	destination: { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles' },
	departure: { scheduled: '2024-10-31T08:00:00Z', terminal: '8', gate: '23' },
	arrival: { scheduled: '2024-10-31T11:30:00Z', terminal: '4', gate: '42' },
	status: 'On Time',
	aircraft: 'Boeing 737-800',
	duration: '5h 30m',
	delay: 0,
}

describe('WatchlistContext', () => {
	beforeEach(() => {
		vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
			return key === 'flightWatchlist' ? null : null
		})
		vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {})
	})

	it('adds and removes flights from watchlist', () => {
		const { result } = renderHook(() => useWatchlist(), { wrapper })

		act(() => {
			result.current.addToWatchlist(sampleFlight)
		})
		expect(result.current.isInWatchlist(sampleFlight.id)).toBe(true)

		act(() => {
			result.current.removeFromWatchlist(sampleFlight.id)
		})
		expect(result.current.isInWatchlist(sampleFlight.id)).toBe(false)
	})

	it('persists to localStorage when watchlist changes', () => {
		const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
		const { result } = renderHook(() => useWatchlist(), { wrapper })

		act(() => {
			result.current.addToWatchlist(sampleFlight)
		})

		expect(setItemSpy).toHaveBeenCalledWith('flightWatchlist', expect.any(String))
	})
})
