// @ts-ignore
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

/** Nice attempt!
 * Only update the relevant child when you have a big list of items
 * Good read: https://alexsidorenko.com/blog/react-list-rerender/
 */
const BIG_LIST = [...Array(5).keys()].map((_, i) => ({
  id: uuidv4(),
  isChecked: false,
}));

const BigList = () => {
  const [list, setList] = React.useState(BIG_LIST);

  /** Perf 👎🏼 
  const toggleCheck = (id) => {
    setList((prevList) =>
      prevList.map((i) => (i.id === id ? { ...i, isChecked: !i.isChecked } : i))
    );
  };
  */

  /** Perf 👍🏻
   * Had to use functional state update, because `list` as the dependency array is not appropriate in this case
   * coz its state is gonna changa anyway
   */
  const toggleCheck = React.useCallback((id: string) => {
    setList((prevList) =>
      prevList.map((i) => (i.id === id ? { ...i, isChecked: !i.isChecked } : i))
    );
  }, []); // given an empty array means this `toggleCheck` function is gonna be memoized through the App lifecycle;

  return (
    <div>
      {list.map((i) => (
        <CheckBox
          key={i.id}
          id={i.id}
          checked={i.isChecked}
          onToggle={toggleCheck}
        />
      ))}
    </div>
  );
};

export default BigList;

// @ts-ignore
const CheckBox = React.memo(({ id, checked, onToggle }) => {
  console.log('CHECKBOX RERENDER');
  return (
    <div>
      <input checked={checked} type="checkbox" onChange={() => onToggle(id)} />
      <span>{id}</span>
    </div>
  );
});
