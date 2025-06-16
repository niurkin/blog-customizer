import { CSSProperties, useState } from 'react';

import { Article } from 'src/components/article/Article';
import { ArticleParamsForm } from 'src/components/article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from 'src/constants/articleProps';

import 'src/styles/index.scss';
import styles from 'src/styles/index.module.scss';


export const App = () => {
	const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState);

	const updateArticleState = (data: ArticleStateType) => {
		setArticleState({
			...articleState,
			...data
		});
	  };

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm formAction={updateArticleState} />
			<Article />
		</main>
	);
};