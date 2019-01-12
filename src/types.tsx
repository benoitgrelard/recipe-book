export type User = {
	id: string;
	name: string;
};

export type Recipe = {
	id: string;
	name?: string;
	description?: string;
	url?: string;
	author: User;
	tags?: string[];
};
