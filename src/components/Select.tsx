import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

export interface Option {
	label: string;
	value: string;
	disabled?: boolean;
}

interface SelectProps {
	options: Option[];
	value: string;
	onChange: (next: string) => void;
	placeholder?: string;
}

export const Select = ({ options, value, onChange, placeholder = 'Select' }: SelectProps) => {
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState(0);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const listRef = useRef<HTMLUListElement>(null);

	const selected = useMemo(() => options.find(o => o.value === value), [options, value]);

	useEffect(() => {
		const onDoc = (e: MouseEvent) => {
			if (!buttonRef.current || !listRef.current) return;
			if (buttonRef.current.contains(e.target as Node)) return;
			if (listRef.current.contains(e.target as Node)) return;
			setOpen(false);
		};
		document.addEventListener('mousedown', onDoc);
		return () => document.removeEventListener('mousedown', onDoc);
	}, []);

	const visibleOptions = options;

	const handleKey = (e: React.KeyboardEvent) => {
		if (!open) return;
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setActive(i => (i + 1) % visibleOptions.length);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setActive(i => (i - 1 + visibleOptions.length) % visibleOptions.length);
		} else if (e.key === 'Enter') {
			const opt = visibleOptions[active];
			if (opt && !opt.disabled) {
				onChange(opt.value);
				setOpen(false);
			}
		} else if (e.key === 'Escape') {
			setOpen(false);
		}
	};

	return (
		<div className="relative" onKeyDown={handleKey}>
			<button
				ref={buttonRef}
				type="button"
				onClick={() => setOpen(o => !o)}
				className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm transition-all
				bg-white dark:bg-transparent border-black/10 dark:border-white/10
				text-night dark:text-white hover:bg-black/5 dark:hover:bg-white/10`}
			>
				<span className="truncate min-w-[8rem] text-left">
					{selected ? selected.label : <span className="text-night/60 dark:text-white/60">{placeholder}</span>}
				</span>
				<FaChevronDown className={`text-night/60 dark:text-white/60 transition-transform ${open ? 'rotate-180' : ''}`} />
			</button>
			<AnimatePresence>
				{open && (
					<motion.ul
						ref={listRef}
						initial={{ opacity: 0, y: -4, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -4, scale: 0.98 }}
						transition={{ duration: 0.12 }}
						className="absolute z-30 mt-2 w-[min(18rem,85vw)] max-h-64 overflow-auto rounded-xl border shadow-card backdrop-blur-xl
						bg-white/95 dark:bg-[#0b1325]/95 border-black/10 dark:border-white/10"
					>
						{visibleOptions.map((opt, i) => (
							<li
								key={opt.value || i}
								className={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between select-none
								${i === active ? 'bg-black/5 dark:bg-white/10' : ''}
								${opt.disabled ? 'opacity-40 pointer-events-none' : ''}`}
								onMouseEnter={() => setActive(i)}
								onMouseDown={() => { if (!opt.disabled) { onChange(opt.value); setOpen(false); } }}
							>
								<span className="text-night dark:text-white">{opt.label}</span>
							</li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	);
};
