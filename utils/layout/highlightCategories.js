import { objectKeysAll } from "../data/objectKeysAll";

export function highLightCategories(categoryKey, isCategories) {
  if (categoryKey in objectKeysAll && isCategories) {
    return <td className="bg-green-200">{categoryKey}</td>;
  }

  return <td>{categoryKey}</td>;
}
