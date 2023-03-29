import { FC, useState, ReactElement, useEffect, useRef } from 'react';
import { Divider, Typography,Form, Input, InputRef } from 'antd';
import { nanoid } from 'nanoid';
import { ToDoElement, ToDoInputValues } from './types';

import TodoItems from './components/TodoItems';

import 'antd/dist/reset.css';
import './index.css'

const App: FC = (): ReactElement => {
  const [todos, setTodos] = useState<ToDoElement[]>([])
  const inputRef = useRef<InputRef>(null);

  const [form] = Form.useForm();
  const { Title, Text } = Typography;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current!.focus({
        cursor: 'start'
      });
    }
  }, [inputRef]);

  chrome.storage.sync.get(['todos'], (result): ToDoElement[] => {
    if (result.todos) {
      setTodos(result.todos);
      return result.todos;
    }
    return [];
  });

  const toggleChecked = (id: string) => {
    const newTodos = todos.map((todo: ToDoElement) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(newTodos);
    chrome.storage.sync.set({ todos: newTodos });
  };

  const handleTodoAdd = (values: ToDoInputValues) => {
    const text = values['todo-input-item']
    const newTodo: ToDoElement = {
      id: nanoid(),
      text: text,
      completed: false
    }
    setTodos([...todos, newTodo]);
    form.resetFields();
    chrome.storage.sync.set({ todos: [...todos, newTodo] });
  }

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo: ToDoElement) => todo.id !== id));
    chrome.storage.sync.set({ todos: todos.filter((todo: ToDoElement) => todo.id !== id) });
  }

  const completedTodos = todos.filter((todo: ToDoElement) => todo.completed);
  const notCompletedTodos = todos.filter((todo: ToDoElement) => !todo.completed);

  return (
    <div className="App">
      <Title>ToDo List</Title>
      <Divider />
      <Form
        form={form}
        name='todo-input'
        onFinish={handleTodoAdd}
      >
        <Form.Item name='todo-input-item'>
          <Input
            placeholder='Enter a todo'
            ref={inputRef}
          />
        </Form.Item>
      </Form>
      { todos.length === 0 &&
        <Text
          className='center-text'
          type='secondary'
        >
          No todos yet
        </Text>
      }
      <div className='todo-container'>
          <TodoItems
            name='Tasks'
            items={notCompletedTodos}
            onChecked={toggleChecked}
            onDelete={handleDelete}
          />
      </div>
      <div className='todo-container'>
        <TodoItems
          name='Completed'
          items={completedTodos}
          onChecked={toggleChecked}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
