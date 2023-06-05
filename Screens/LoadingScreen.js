    import React from 'react';
    import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    } from 'react-native';

    const LoadingScreen = () => {
    return (
        <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.text}>Loading...</Text>
        </View>
    );
    };

    const styles = StyleSheet.create({
        container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', // add this to position the container absolutely
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 999,
        },
        text: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        },
    });
    

    export default LoadingScreen;
