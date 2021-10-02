import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import Colors from '../constants/Colors';

const PlaylistCard = ({description}) => {
  
    return (
    <View style={styles.container}>
        <Text adjustsFontSizeToFit={true} minimumFontScale={0.8} numberOfLines={1} ellipsizeMode={'tail'} style={styles.description}>
            {description}               
        </Text>                      
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        marginHorizontal: 15,
        // paddingVertical: 5,
        height: 50
    },
})
export default PlaylistCard;
