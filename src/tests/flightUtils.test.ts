import { describe, it, expect } from 'vitest'
import { formatDateTime, getStatusColor, calculateDelay } from '../utils/flightUtils'

describe('flightUtils', () => {
	it('formats ISO date strings into readable format', () => {
		const result = formatDateTime('2024-10-31T08:00:00Z')
		expect(result).toMatch(/Oct\s31,\s2024\s8:00\sAM|Oct\s31,\s2024\s1:30\sPM|/)
	})

	it('returns correct status color classes', () => {
		expect(getStatusColor('On Time')).toContain('bg-green-100')
		expect(getStatusColor('Delayed')).toContain('bg-yellow-100')
		expect(getStatusColor('Cancelled')).toContain('bg-red-100')
		expect(getStatusColor('Unknown')).toContain('bg-gray-100')
	})

	it('calculates delay in minutes when actual is provided', () => {
		const scheduled = '2024-10-31T08:00:00Z'
		const actual = '2024-10-31T08:15:00Z'
		expect(calculateDelay(scheduled, actual)).toBe(15)
	})

	it('returns 0 delay when actual is not provided', () => {
		expect(calculateDelay('2024-10-31T08:00:00Z')).toBe(0)
	})
})
