type ToDoElement = {
  id: string;
  text: string;
  completed: boolean;
}

type ToDoInputValues = {
  'todo-input-item': string;
}

type ToDoItemsProps = {
  name: string;
  items: ToDoElement[];
  onDelete: (id: string) => void;
  onChecked: (id: string) => void;
}

export type {
  ToDoElement,
  ToDoInputValues,
  ToDoItemsProps,
}
