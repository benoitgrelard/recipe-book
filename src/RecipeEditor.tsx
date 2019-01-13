import React, { FC } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css';

type RecipeEditorProps = {
	value: string;
	onChange: (value: string) => void;
};

export const RecipeEditor: FC<RecipeEditorProps> = ({ value, onChange }) => (
	<CodeMirror
		value={value}
		options={{
			mode: 'markdown',
			lineWrapping: true,
		}}
		onChange={(editor, data, value) => onChange(value)}
	/>
);
