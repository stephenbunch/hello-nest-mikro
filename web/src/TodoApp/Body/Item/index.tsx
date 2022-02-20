import classNames from "classnames";
import { useCallback, useState, KeyboardEvent } from "react";
import { Key } from "ts-key-enum";
import { useMutation, useQueryClient } from "react-query";
import { EntityCacheKey } from "../../../entity-cache";
import { Todo } from "../../../api";
import { useApiClient } from "../../../api-client";

export interface TodoItemProps {
  todo: Todo;
}

export function Item(props: TodoItemProps) {
  const { todo } = props;

  const queryClient = useQueryClient();
  const api = useApiClient();
  const { mutateAsync: deleteTodoMutation } = useMutation(api.deleteTodo);
  const { mutateAsync: updateTodoMutation } = useMutation(api.updateTodo);

  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState("");

  const commitDescription = useCallback(async () => {
    await updateTodoMutation({ id: todo.id, updateTodoDto: { description } });
    await queryClient.invalidateQueries(EntityCacheKey.Todos);
    setEditing(false);
    setDescription("");
  }, [todo, description, updateTodoMutation, queryClient]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === Key.Enter) {
        commitDescription();
      } else if (e.key === Key.Escape) {
        setEditing(false);
        setDescription("");
      }
    },
    [commitDescription]
  );

  const beginEditing = useCallback(() => {
    setDescription(todo.description);
    setEditing(true);
  }, [todo]);

  const markCompleted = useCallback(async () => {
    await updateTodoMutation({
      id: todo.id,
      updateTodoDto: { completed: !todo.completed },
    });
    await queryClient.invalidateQueries(EntityCacheKey.Todos);
  }, [todo, updateTodoMutation, queryClient]);

  const deleteTodo = useCallback(async () => {
    await deleteTodoMutation({ id: todo.id });
    await queryClient.invalidateQueries(EntityCacheKey.Todos);
  }, [todo, deleteTodoMutation, queryClient]);

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing,
      })}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          readOnly
          onClick={markCompleted}
        />
        <label onDoubleClick={beginEditing}>{todo.description}</label>
        <button className="destroy" onClick={deleteTodo}></button>
      </div>
      {editing && (
        <input
          className="edit"
          value={description}
          onKeyDown={onKeyDown}
          onBlur={commitDescription}
          onChange={(e) => setDescription(e.target.value)}
          autoFocus
        />
      )}
    </li>
  );
}
