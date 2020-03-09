import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Modal, StyleSheet, TextInput, View } from 'react-native';
import { THEME } from "../theme";

const EditModal = ({visible, onCancel, value, onSave}) => {
    const [title, setTitle] = useState(value);

    const saveHandler = () => {
        if (title.trim().length < 3) {
            Alert.alert('Error', `The minimum title's length is 3 symbols while now it is ${title.trim().length} symbols.`)
        } else {
            onSave(title)
        }
    };

    return (
        <Modal visible={visible} animationType='slide'>
            <View style={styles.wrap}>
                <TextInput
                    style={styles.input}
                    placeholder='Input new title...'
                    autoCorrect={false}
                    autoCapitalize='sentences'
                    maxLength={64}
                    value={title}
                    onChangeText={setTitle}
                />
                <View style={styles.buttons}>
                    <Button title='Cancel' onPress={onCancel} color={THEME.DANGER_COLOR}/>
                    <Button title='Save' onPress={saveHandler}/>
                </View>

            </View>
        </Modal>
    )
};

EditModal.propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
    value: PropTypes.string,
};

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%'
    },
    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'

    }
});

export default EditModal;