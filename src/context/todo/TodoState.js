import React, { useReducer, useContext } from 'react';
import { StyleSheet, Alert } from 'react-native';

import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types';
import { ScreenContext } from '../screen/screenContext';

const TodoState = ({ children }) => {
    const initialSate = {
        todos: [
            { id: 1, title: 'test 1' },
            { id: 2, title: 'test 2' },
            { id: 3, title: 'test 3' },
            { id: 4, title: 'test 4' },
            { id: 5, title: 'test 5' },
            { id: 6, title: 'test 6' },
            { id: 7, title: 'test 7' },
            { id: 8, title: 'test 8' },
            { id: 9, title: 'test 9' },
        ],
    };

    const { changeScreen } = useContext(ScreenContext);

    const [state, dispatch] = useReducer(todoReducer, initialSate);

    const addTodo = title => dispatch({ type: ADD_TODO, title });

    const removeTodo = id => {
        Alert.alert(
            'Todo delete',
            'Are you sure?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        changeScreen(null);
                        dispatch({ type: REMOVE_TODO, id });
                    },
                },
            ],
            { cancelable: false },
        );
    };

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
