export type User = {
	id: string;
	name: string;
};

export type Recipe = {
	id: string;
	name?: string;
	content?: string;
	reference?: string;
	author: User;
};
