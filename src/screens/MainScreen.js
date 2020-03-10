import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, View, Image, Dimensions } from 'react-native';
import AddTodo from '../components/AddTodo';
import Todo from '../components/Todo';
import { THEME } from '../theme';
import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';

const MainScreen = () => {
    const { addTodo, todos, removeTodo } = useContext(TodoContext);
    const { changeScreen } = useContext(ScreenContext);
    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);

    useEffect(() => {
        const update = () => {
            const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
            setDeviceWidth(width);
        };

        Dimensions.addEventListener('change', update);

        return () => {
            Dimensions.removeEventListener('change', update);
        };
    });

    let content = (
        <View style={{ width: deviceWidth, flex: 1 }}>
            <FlatList
                keyExtractor={item => item.id.toString()}
                data={todos}
                renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />}
            />
        </View>
    );

    if (todos.length === 0) {
        content = (
            <View style={styles.imgWrap}>
                <Image style={styles.image} source={require('../../assets/no-items.png')} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <AddTodo onSubmit={addTodo} />
            {content}
        </View>
    );
};

MainScreen.propTypes = {
    todos: PropTypes.array,
    addTodo: PropTypes.func,
    removeTodo: PropTypes.func,
    openTodo: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 300,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default MainScreen;
