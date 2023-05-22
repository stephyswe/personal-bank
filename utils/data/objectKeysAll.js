import { objectCustomExpense } from "./objectCustomExpense";
import { objectPermExpense } from "./objectPermExpense";

export const objectKeysAll = { ...objectPermExpense, ...objectCustomExpense };
