import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const NavBar = ({title}) => {
    return (
        <View style={styles.navbar}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
};

NavBar.propTypes = {
    title: PropTypes.string,
};

export default NavBar;

const styles = StyleSheet.create({
    navbar: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#6565bf',
        paddingBottom: 10
    },
    text: {
        color: 'white',
        fontSize: 20
    }
});