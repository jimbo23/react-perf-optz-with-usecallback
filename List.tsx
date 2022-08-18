import * as React from 'react';
import { User } from './App';

interface ListProps {
  users: User[];
  onRemove: (userId: string) => void;
}

const List = ({ users, onRemove }: ListProps) => {
  console.log('List rerenders!!');

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} <span onClick={() => onRemove(user.id)}>X!</span>
        </li>
      ))}
    </ul>
  );
};

export default React.memo(List);
