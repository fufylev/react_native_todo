import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import NavBar from "./src/NavBar";
import Constants from 'expo-constants';
import AddTodo from "./src/AddTodo";

function MyStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}


export default function App() {
    const [todos, setTodos] = useState([]);

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

    return (
        <View>
            <MyStatusBar backgroundColor='grey' barStyle="light-content"/>
            <NavBar title='Todo App'/>
            <View style={styles.container}>
                <AddTodo onSubmit={addTodo}/>
                <View>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingVertical: 5
    },
});