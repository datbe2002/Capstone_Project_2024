import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface BetProps {
    height: number;
}

const SpaceBet: React.FC<BetProps> = ({ height }) => {
    return (
        <View style={{ height: height }}>
            {/* Your component content */}
        </View>
    );
};

export default SpaceBet;
