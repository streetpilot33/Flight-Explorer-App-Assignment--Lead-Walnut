import { useMemo } from 'react';
import { Flight } from '../types/flight';
import { Select } from './Select';
import { motion } from 'framer-motion';

export interface FiltersState {
	airline: string;
	status: string;
	time: 'any' | 'morning' | 'afternoon' | 'evening' | 'night';
}

interface FiltersProps {
	flights: Flight[];
	value: FiltersState;
	onChange: (next: FiltersState) => void;
}

export const Filters = ({ flights, value, onChange }: FiltersProps) => {
	const airlines = useMemo(() => {
		return Array.from(new Set(flights.map(f => f.airline))).sort();
	}, [flights]);

	const onField = (patch: Partial<FiltersState>) => onChange({ ...value, ...patch });

	return (
		<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="flex flex-wrap items-center gap-3 py-3 px-4 rounded-2xl border bg-white/90 dark:bg-white/5 border-black/10 dark:border-white/10">
			<Select
				options={[{ label: 'All airlines', value: '' }, ...airlines.map(a => ({ label: a, value: a }))]}
				value={value.airline}
				onChange={(v) => onField({ airline: v })}
				placeholder="All airlines"
			/>

			<Select
				options={[
					{ label: 'All status', value: '' },
					{ label: 'On Time', value: 'On Time' },
					{ label: 'Delayed', value: 'Delayed' },
					{ label: 'Cancelled', value: 'Cancelled' },
				]}
				value={value.status}
				onChange={(v) => onField({ status: v })}
				placeholder="All status"
			/>

			<Select
				options={[
					{ label: 'Any time', value: 'any' },
					{ label: 'Morning (5-12)', value: 'morning' },
					{ label: 'Afternoon (12-17)', value: 'afternoon' },
					{ label: 'Evening (17-21)', value: 'evening' },
					{ label: 'Night (21-5)', value: 'night' },
				]}
				value={value.time}
				onChange={(v) => onField({ time: v as FiltersState['time'] })}
				placeholder="Any time"
			/>
		</motion.div>
	);
};
