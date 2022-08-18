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
