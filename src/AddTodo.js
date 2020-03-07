import React from 'react';
import PropTypes from 'prop-types';
import { Button, StyleSheet, TextInput, View } from 'react-native';

const AddTodo = ({onSubmit}) => {

    const pressHandler = () => {
        onSubmit('test todo')
    };

    return (
        <View style={styles.block}>
            <TextInput style={styles.input}/>
            <Button title='Добавить' onPress={pressHandler}/>
        </View>
    )
};

AddTodo.propTypes = {
    onSubmit: PropTypes.func,
};

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        width: '70%',
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: '#3949ab'
    }
});

export default AddTodo;