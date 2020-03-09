import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from "prop-types";
import { THEME } from "../theme";

const Todo = ({todo, onRemove, onOpen}) => {
    return (
        <TouchableOpacity
            onPress={() => onOpen(todo.id)}
            onLongPress={onRemove.bind(null, todo.id)}
        >
            <View style={styles.todo}>
                <Text>{todo.title}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    todo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: THEME.MAIN_COLOR,
        borderRadius: 5,
        marginBottom: 10
    }
});

Todo.propTypes = {
    todo: PropTypes.object,
    onRemove: PropTypes.func,
    onOpen: PropTypes.func,
};

export default Todo;