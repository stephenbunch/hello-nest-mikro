import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useApiClient } from "../../api-client";
import { EntityCacheKey } from "../../entity-cache";
import { Filter, filters } from "../Filter";

export interface FooterProps {
  activeTodoCount: number;
  selectedFilter: Filter;
  onFilterChange: (filter: Filter) => void;
}

export function Footer(props: FooterProps) {
  const { selectedFilter, onFilterChange, activeTodoCount } = props;

  const queryClient = useQueryClient();
  const api = useApiClient();
  const { mutateAsync: deleteCompletedTodos } = useMutation(
    api.todosControllerDeleteCompleted
  );

  const onClearCompleted = useCallback(async () => {
    await deleteCompletedTodos({});
    await queryClient.invalidateQueries(EntityCacheKey.Todos);
  }, [deleteCompletedTodos, queryClient]);

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeTodoCount}</strong>
        <span> </span>
        <span>{activeTodoCount === 1 ? "item" : "items"}</span>
        <span> left</span>
      </span>
      <ul className="filters">
        {filters.map((filter) => (
          <li key={filter}>
            <a
              href="/#"
              className={filter === selectedFilter ? "selected" : undefined}
              onClick={() => onFilterChange(filter)}
            >
              {filter}
            </a>
          </li>
        ))}
      </ul>
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}
