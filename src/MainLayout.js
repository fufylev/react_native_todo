import React, { useState, useContext } from 'react';
import { Alert, StatusBar, StyleSheet, View, Platform } from 'react-native';
import Constants from 'expo-constants';
import { THEME } from './theme';
import NavBar from './components/NavBar';

import MainScreen from './screens/MainScreen';
import TodoScreen from './screens/TodoScreen';
import { ScreenContext } from './context/screen/screenContext';

function MyStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    );
}

const MainLayout = () => {
    const { todoId } = useContext(ScreenContext);

    return (
        <View style={{ flex: 1 }}>
            <MyStatusBar
                backgroundColor={Platform.OS === 'ios' ? '#fff' : THEME.MAIN_COLOR}
                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
            />
            <NavBar title="Todo App" />
            <View style={styles.container}>{todoId ? <TodoScreen /> : <MainScreen />}</View>
        </View>
    );
};

export default MainLayout;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: 10,
        flex: 1,
    },
});
