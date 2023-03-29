import { FC, ReactElement } from 'react';
import { Divider, Checkbox, Typography, Button } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { ToDoElement, ToDoItemsProps } from '../types';

const TodoItems: FC<ToDoItemsProps> = ({ name, items, onChecked, onDelete }: ToDoItemsProps): ReactElement => {
  const { Text } = Typography;
  return (
    <>
      { items.length > 0 && <Divider orientation='left'>{name}</Divider> }
      <div className='todo-container'>
        {items.map((todo: ToDoElement) => (
          <div key={todo.id} className='todo-item-container'>
            <div className='todo-item-left'>
              <Checkbox
                className='todo-item'
                checked={todo.completed}
                onChange={() => onChecked(todo.id)}
              />
              <Text
                className='todo-item todo-text-padding-left'
                delete={todo.completed}
                italic={todo.completed}
                >
                  {todo.text}
              </Text>
            </div>
            <div className='todo-item-right'>
              <Button
                type='dashed'
                icon={<DeleteTwoTone twoToneColor='#EE4B2B' />}
                onClick={() => onDelete(todo.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoItems;
