import React, { useReducer, useContext } from 'react';
import { StyleSheet, Alert } from 'react-native';

import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import {
    ADD_TODO,
    REMOVE_TODO,
    UPDATE_TODO,
    SHOW_LOADER,
    HIDE_LOADER,
    SHOW_ERROR,
    CLEAR_ERROR,
    FETCH_TODOS,
} from '../types';

import { ScreenContext } from '../screen/screenContext';
import { Http } from '../../http';

const TodoState = ({ children }) => {
    const initialSate = {
        todos: [],
        loading: false,
        error: null,
    };

    const { changeScreen } = useContext(ScreenContext);

    const [state, dispatch] = useReducer(todoReducer, initialSate);

    const addTodo = async title => {
        clearError();
        try {
            const data = await Http.post('https://react-native-todo-app-c1e4c.firebaseio.com/todos.json', { title });
            dispatch({ type: ADD_TODO, title, id: data.name });
        } catch (e) {
            showError('Smth went wrng');
        }
    };

    const removeTodo = id => {
        const todo = state.todos.find(t => t.id === id);
        Alert.alert(
            'Todo delete',
            `Are you sure?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        changeScreen(null);
                        await Http.delete(`https://react-native-todo-app-c1e4c.firebaseio.com/todos/${id}.json`);
                        dispatch({ type: REMOVE_TODO, id });
                    },
                },
            ],
            { cancelable: false },
        );
    };

    const fetchTodos = async () => {
        showLoader();
        clearError();
        try {
            const data = await Http.get('https://react-native-todo-app-c1e4c.firebaseio.com/todos.json');
            const todos = Object.keys(data).map(key => ({ ...data[key], id: key }));
            dispatch({ type: FETCH_TODOS, todos });
        } catch (e) {
            showError('Something went wrong, try again');
            console.log('Eroor', e);
        } finally {
            hideLoader();
        }
    };

    const updateTodo = async (id, title) => {
        clearError();
        try {
            await Http.patch(`https://react-native-todo-app-c1e4c.firebaseio.com/todos/${id}.json`, { title });
            dispatch({ type: UPDATE_TODO, id, title });
        } catch (e) {
            showError('Something went wrong, try again');
            console.log('Eroor', e);
        } finally {
        }
    };

    const showLoader = () => dispatch({ type: SHOW_LOADER });
    const hideLoader = () => dispatch({ type: HIDE_LOADER });

    const showError = error => dispatch({ type: SHOW_ERROR, error });
    const clearError = error => dispatch({ type: CLEAR_ERROR });

    return (
        <TodoContext.Provider
            value={{
                todos: state.todos,
                loading: state.loading,
                error: state.error,
                addTodo,
                removeTodo,
                updateTodo,
                fetchTodos,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

export default TodoState;

// const styles = StyleSheet.create({});
