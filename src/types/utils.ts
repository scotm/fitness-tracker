export type ExtractKeysOfValueType<T, K> = {
	[I in keyof T]: T[I] extends K ? I : never;
}[keyof T];
export type RemoveUndefinedFromUnion<T> = T extends undefined ? never : T;
export type ExtractKeysOfStringArray<T> = RemoveUndefinedFromUnion<
	ExtractKeysOfValueType<T, string[]>
>;
