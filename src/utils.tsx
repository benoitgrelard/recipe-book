export const mapControlsToValues = (
	elems: HTMLInputElement[]
): { [index: string]: string } =>
	Array.from(elems)
		.filter(x => x.name !== '')
		.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.value }), {});
