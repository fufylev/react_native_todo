import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { THEME } from "../theme";

const AddTodo = ({onSubmit}) => {
    const [value, setValue] = useState('');

    const pressHandler = () => {
        if (value.trim()) {
            onSubmit(value);
            setValue('');
        } else {
            Alert.alert(`Task can't be empty` );
        }
    };

    return (
        <View style={styles.block}>
            <TextInput
                style={styles.input}
                onChangeText={setValue}
                value={value}
                placeholder='Input task to do ....'
                autoCorrect={false}
                autoCapitalize='sentences'
            />
            <Button title='Add' onPress={pressHandler}/>
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
        alignItems: 'center',
        marginBottom: 15
    },
    input: {
        width: '70%',
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_COLOR
    }
});

export default AddTodo;