import React, { useReducer } from "react";
import { StyleSheet } from "react-native";

import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../types";

const TodoState = ({ children }) => {
  const initialSate = {
    todos: [
      { id: 1, title: "test 1" },
      { id: 2, title: "test 2" },
      { id: 3, title: "test 3" },
      { id: 4, title: "test 4" },
      { id: 5, title: "test 5" },
      { id: 6, title: "test 6" },
      { id: 7, title: "test 7" },
      { id: 8, title: "test 8" },
      { id: 9, title: "test 9" },
    ],
  };

  const [state, dispatch] = useReducer(todoReducer, initialSate);

  const addTodo = title => dispatch({ type: ADD_TODO, title });

  const removeTodo = id => dispatch({ type: REMOVE_TODO, id });

  const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        removeTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoState;

const styles = StyleSheet.create({});
