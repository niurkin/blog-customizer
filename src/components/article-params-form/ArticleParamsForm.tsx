import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { OptionType, fontFamilyOptions, fontColors, backgroundColors, contentWidthArr, fontSizeOptions, ArticleStateType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type FormProps = {
	formSetter: ArticleStateType;
	onSubmit: (data: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({ formSetter, onSubmit, onReset }: FormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState<ArticleStateType>(formSetter);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const toggleOpenState = () => {
		setIsOpen(isOpen === false ? true : false);
	};

	const handleInputChange = (value: OptionType) => {
		return function(evt: ChangeEvent<HTMLInputElement>) {
			const target = evt.target;
			const name = target.name;

			setFormState({
				...formState,
					[name]: value
				  });
		}
	};

	const handleSubmit = (evt: React.SyntheticEvent<HTMLFormElement>) => {
		evt.preventDefault();
		onSubmit(formState);
	};

	useEffect(() => {
		const handleClickOutside = (evt: MouseEvent) => {
			if (
				isOpen === true &&
				containerRef.current &&
				!containerRef.current.contains(evt.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);
	

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpenState} />
			<aside
			  ref={containerRef}
			  className={clsx(styles.container, { [styles.container_open]: isOpen === true })}>
				<form className={styles.form} onSubmit={handleSubmit}>
				<Text as='h2' size={31} weight={800} uppercase>
					Задайте параметры
				</Text>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' onClick={onReset} />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
