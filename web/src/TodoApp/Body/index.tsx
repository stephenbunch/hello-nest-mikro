import { useCallback, useMemo } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Todo } from "../../api";
import { useApiClient } from "../../api-client";
import { EntityCacheKey } from "../../entity-cache";
import { Item } from "./Item";

export interface BodyProps {
  todos: Todo[];
}

export function Body(props: BodyProps) {
  const { todos } = props;

  const toggleAllChecked = useMemo(
    () => todos.filter((t) => t.completed).length === todos.length,
    [todos]
  );

  const queryClient = useQueryClient();
  const api = useApiClient();
  const { mutateAsync: updateTodos } = useMutation(
    api.todosControllerUpdateMany
  );

  const toggleAll = useCallback(async () => {
    if (toggleAllChecked) {
      await updateTodos({ updateTodoDto: { completed: false } });
    } else {
      await updateTodos({ updateTodoDto: { completed: true } });
    }
    await queryClient.invalidateQueries(EntityCacheKey.Todos);
  }, [toggleAllChecked, updateTodos, queryClient]);

  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={toggleAllChecked}
        readOnly
      />
      <label htmlFor="toggle-all" onClick={toggleAll}></label>
      <ul className="todo-list">
        {todos.map((todo) => (
          <Item key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
}
