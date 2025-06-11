import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState } from "react";
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type FormState = 'closed' | 'opened';

export const ArticleParamsForm = () => {
	const [state, setState] = useState<FormState>('closed');
	const toggleState = () => {
		setState(state === 'closed' ? 'opened' : 'closed');
	};
	return (
		<>
			<ArrowButton isOpen={state === 'closed' ? false : true} onClick={toggleState} />
			<aside className={clsx(styles.container, { [styles.container_open]: state === 'opened' })}>
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
