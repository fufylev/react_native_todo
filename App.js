import React, { useState } from 'react';
import { Alert, StatusBar, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

import NavBar from "./src/components/NavBar";
import MainScreen from "./src/screens/MainScreen";
import TodoScreen from "./src/screens/TodoScreen";

function MyStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

export default function App() {
    const [todoId, setTodoId] = useState(null);

    const [todos, setTodos] = useState([
        {id: 1, title: 'test 1'},
        {id: 2, title: 'test 2'},
     /*   {id: 3, title: 'test 3'},
        {id: 4, title: 'test 4'},
        {id: 5, title: 'test 5'},
        {id: 6, title: 'test 6'},
        {id: 7, title: 'test 7'},
        {id: 8, title: 'test 8'},
        {id: 9, title: 'test 9'},
        {id: 10, title: 'test 10'},
        {id: 11, title: 'test 11'},
        {id: 12, title: 'test 12'},
        {id: 13, title: 'test 13'},
        {id: 14, title: 'test 14'},
        {id: 15, title: 'test 15'},*/
    ]);

    const addTodo = (title) => {
        setTodos(prev => [
                {
                    id: Date.now().toString(),
                    title
                },
                ...prev,
            ]
        )
    };

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
                        setTodoId(null);
                        setTodos(prev => prev.filter(todo => todo.id !== id));
                    }
                },
            ],
            {cancelable: false},
        );
    };

    const updateTodo = (id, title) => {
        setTodos(prev => prev.map(todo => {
            if (todo.id === id) {
                todo.title = title
            }
            return todo;
        }))
    };

    let content = (
        <MainScreen
            addTodo={addTodo}
            removeTodo={removeTodo}
            todos={todos}
            openTodo={setTodoId}
        />
    );

    if (todoId) {
        const selectedTodo = todos.find((todo) => todo.id === todoId);
        content = <TodoScreen
            goBack={() => setTodoId(null)}
            todo={selectedTodo}
            onRemove={removeTodo}
            onSave={updateTodo}
        />
    }

    return (
        <View style={{flex: 1}}>
            <MyStatusBar backgroundColor='grey' barStyle="light-content"/>
            <NavBar title='Todo App'/>
            <View style={styles.container}>
                {content}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flex: 1
    },
});