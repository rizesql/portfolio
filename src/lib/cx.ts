import { defineConfig, type CVA } from "cva";
import { twMerge } from "tailwind-merge";

export const { cva, cx, compose } = defineConfig({
	hooks: {
		onComplete: (className) => twMerge(className),
	},
});

type OmitUndefined<T> = T extends undefined ? never : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VariantProps<Component extends (...args: any[]) => any> = Omit<
	OmitUndefined<Parameters<Component>[0]>,
	"className"
>;

type ClassValue =
	| ClassValue[]
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	| Record<string, any>
	| string
	| number
	| null
	| boolean
	| undefined;

export const extend = <R extends ReturnType<CVA>>(root: R, value: ClassValue) => {
	return ({ class: _class, ...other }: VariantProps<R>) =>
		root({ class: [value, _class], ...other });
};
