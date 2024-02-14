import { cva } from "cva";

/** An util to make children have minimal touch target */
export const touchable = cva({
	base: "touch:min-h-12 touch:min-w-12",
});
