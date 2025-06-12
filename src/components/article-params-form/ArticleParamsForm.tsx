import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type FormState = 'closed' | 'opened';

export const ArticleParamsForm = () => {
	const [state, setState] = useState<FormState>('closed');
	const containerRef = useRef<HTMLDivElement | null>(null);

	const toggleState = () => {
		setState((prev) => (prev === 'closed' ? 'opened' : 'closed'));
	};

	useEffect(() => {
		const handleClickOutside = (evt: MouseEvent) => {
			if (
				state === 'opened' &&
				containerRef.current &&
				!containerRef.current.contains(evt.target as Node)
			) {
				setState('closed');
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [state]);

	return (
		<>
			<ArrowButton isOpen={state === 'opened'} onClick={toggleState} />
			<aside
			  ref={containerRef}
			  className={clsx(styles.container, { [styles.container_open]: state === 'opened' })}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
