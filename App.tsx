/** Some key takeaways from this tutorial:
 * 1. component re-renders when there is a state change or when the prop it receives changes. (fundamental)
 * 2. when a component re-renders, it re-calculates the functions declared within the component.
 * 3. useCallback hook tells React to memoize (or cache) a function value unless there is a change of value in the dependency array.
 * 4. React.memo tells React to compare the Component props with the previous props and only re-render if they are different.
 * ---> read https://dmitripavlutin.com/use-react-memo-wisely/
 */

import * as React from 'react';
import List from './List';
import Button from './Button';
import Input from './Input';
import BigList from './BigList';
import { useCallback, useState } from 'react';

export interface User {
  id: string;
  name: string;
}

const initialUsers: User[] = [
  { id: '1', name: 'kiefer' },
  { id: '2', name: 'jimmy' },
  { id: '3', name: 'lebron' },
];

const App = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [count, setCount] = useState<number>(1);
  const [value, setValue] = useState<string>('wow');

  const handleRemove = useCallback(
    (id: string) => {
      setUsers(users.filter((u) => u.id !== id));
    },
    [users] // Hey React! pls re-calculate the handleIncrement function when `users` state changes
  );

  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, [count]); // Hey React! pls re-calculate the handleIncrement function when `count` state changes

  const handleChangeText = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [value]
  );

  return (
    <div>
      {/** Here's the lifecycle process when there is a state change!
       * When the Button is clicked, the state `count` changes.
       * As a result, Button re-renders (due to the change of prop), and App re-renders (due to the change of state)
       * When App re-renders, it re-calculates all the functions declared within the App
       * That includes `handleRemove` and `handleIncrement`, as well as the `onChangeText` handler
       * These functions are also passed into the child components as props.
       *
       * So guess what happened?
       * All child components re-rerender, though most of them are unnecessary! (# due to change of props)
       * ---> # think from the child components' POV, they receive a new function as prop, also considered a prop change!
       *
       * So how?
       * By wrapping the StateFn handler with useCallback!
       * This tells React to memoize the function value somewhere in the memory,
       * and only recalculate the function when it is supposed to.
       *
       * So, child components without state and prop change now won't re-render,
       * when there is a state change is the parent. (perf ⬆️)
       *
       */}
      <Button count={count} onClick={handleIncrement} />
      <List users={users} onRemove={handleRemove} />
      <Input value={value} onChangeText={handleChangeText} />
      <BigList />
    </div>
  );
};

export default App;
