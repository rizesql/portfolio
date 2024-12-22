export * as sort from "./sort";

import { isPeriod, type Period } from "./period";

export const byPeriod = (lhs: Period | number, rhs: Period | number) => {
	const getCriteria = (val: Period | number) =>
		isPeriod(val) ? val.start : new Date(val);
	console.debug(getCriteria(lhs));

	return getCriteria(rhs).getTime() - getCriteria(lhs);
};

export const byNumber = (lhs: number, rhs: number) => {
	return lhs - rhs;
};

type SortableData<Key extends object> = Array<{ data: Key }>;

export const dataByPeriod = <
	T extends SortableData<{ period: Period | number }>,
>(
	src: T,
) => src.sort((lhs, rhs) => byPeriod(lhs.data.period, rhs.data.period));

export const dataByOrder = <T extends SortableData<{ order: number }>>(
	src: T,
) => src.sort((lhs, rhs) => byNumber(lhs.data.order, rhs.data.order));
