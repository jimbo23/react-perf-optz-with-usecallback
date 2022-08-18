// @ts-ignore
import * as React from 'react';
import List from './List';
import Button from './Button';
import Input from './Input';
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
    [users] // this tells React to re-calculate the handleIncrement function when `users` state changes
  );

  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, [count]); // this tells React to re-calculate the handleIncrement function when `count` state changes

  return (
    <div>
      {/** Here's the lifecycle process when there is a state change!
       * When the Button is clicked, the state `count` changes.
       * As a result, Button re-renders (due to the change of prop), and App re-renders (due to the change of state)
       * When App re-renders, it re-calculates all the functions declared within the App
       * That includes `handleRemove` and `handleIncrement`, as well as the `onChangeText` handler
       * These functions are also passed into the child components as props.
       *
       * So guess what happened? (due to change of props)
       * All child components re-rerender, though most of them are unnecessary! (impact perf!)
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
      <Input
        value={value}
        onChangeText={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default App;
