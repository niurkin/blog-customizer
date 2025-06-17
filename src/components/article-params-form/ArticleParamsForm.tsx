import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { OptionType, fontFamilyOptions, fontColors, backgroundColors, contentWidthArr, fontSizeOptions, defaultArticleState, ArticleStateType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type FormProps = {
	formAction: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ formAction }: FormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement | null>(null);

	const toggleOpenState = () => {
		setIsOpen(isOpen === false ? true : false);
	};

	const handleInputChange = (value: OptionType, name: string | undefined) => {
		if(name) {
			setFormState({
				...formState,
				[name]: value
				  });
		}
	}

	const handleSubmit = (evt: React.SyntheticEvent<HTMLFormElement>) => {
		evt.preventDefault();
		formAction(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		formAction(defaultArticleState);
	};

	useOutsideClickClose({
			isOpen,
			rootRef,
			onChange: setIsOpen,
		});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpenState} />
			<aside
			  ref={rootRef}
			  className={clsx(styles.container, { [styles.container_open]: isOpen === true })}>
				<form className={styles.form} onSubmit={handleSubmit}>
				<Text as='h2' size={31} weight={800} uppercase>
					Задайте параметры
				</Text>
				<Select
				    name='fontFamilyOption'
					selected={formState.fontFamilyOption}
				    onChange={handleInputChange}
				    options={fontFamilyOptions}
				    title='Шрифт'
				/>
				<RadioGroup
				    name='fontSizeOption'
					selected={formState.fontSizeOption}
				    onChange={handleInputChange}
				    options={fontSizeOptions}
				    title='Размер шрифта'
				/>
				<Select
				    name='fontColor'
					selected={formState.fontColor}
				    onChange={handleInputChange}
				    options={fontColors}
				    title='Цвет шрифта'
				/>
				<Separator />
				<Select
				    name='backgroundColor'
					selected={formState.backgroundColor}
				    onChange={handleInputChange}
				    options={backgroundColors}
				    title='Цвет фона'
				/>
				<Select
				    name='contentWidth'
					selected={formState.contentWidth}
				    onChange={handleInputChange}
				    options={contentWidthArr}
				    title='Ширина контента'
				/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' onClick={handleReset} />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
