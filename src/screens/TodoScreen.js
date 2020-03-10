import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Dimensions } from 'react-native';
import { FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { THEME } from '../theme';
import AppCard from '../components/ui/AppCard';
import EditModal from '../components/EditModal';
import AppTextBold from '../components/ui/AppTextBold';
import AppButton from '../components/ui/AppButton';
import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';

const TodoScreen = () => {
    const { todos, updateTodo, removeTodo } = useContext(TodoContext);
    const { todoId, changeScreen } = useContext(ScreenContext);

    const [modal, setModal] = useState(false);
    
    const todo = todos.find(t => t.id === todoId);

    const saveHandler = title => {
        updateTodo(todo.id, title);
        setModal(false);
    };

    return (
        <View>
            <EditModal value={todo.title} visible={modal} onCancel={() => setModal(false)} onSave={saveHandler} />
            <AppCard style={styles.card}>
                <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
                <AppButton onPress={() => setModal(true)}>
                    <FontAwesome name="edit" size={20} color="#fff" />
                </AppButton>
            </AppCard>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton color={THEME.GREY_COLOR} onPress={() => changeScreen(null)}>
                        <AntDesign name="back" size={20} />
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton
                        color={THEME.DANGER_COLOR}
                        onPress={() => {
                            removeTodo(todo.id);
                        }}
                    >
                        <MaterialIcons name="delete" size={20} color="#fff" />
                    </AppButton>
                </View>
            </View>
        </View>
    );
};

TodoScreen.propTypes = {
    goBack: PropTypes.func,
    onRemove: PropTypes.func,
    onSave: PropTypes.func,
    todo: PropTypes.object,
};

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        marginBottom: 20,
        padding: 15,
    },
    button: {
        width: Dimensions.get('window').width > 400 ? 100 : 70,
    },
    title: {
        fontSize: 20,
    },
});

export default TodoScreen;
