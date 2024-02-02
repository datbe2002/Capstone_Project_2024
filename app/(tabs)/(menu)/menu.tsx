import { StyleSheet, Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import UserSection from '../../../components/UserSection';
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';

export type ActiveProps = 'main' | 'noti' | 'ticket'


export default function Menu() {
  // Main menu component
  const [activeButton, setActiveButton] = useState<ActiveProps>('main');

  const handleButtonClick = (buttonName: ActiveProps) => {
    setActiveButton(buttonName);
  };

  useFocusEffect(
    useCallback(() => {
      setActiveButton('main');
    }, [])
  )




  return (
    <SafeAreaView>
      <UserSection activeButton={activeButton} handleButtonClick={handleButtonClick} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});
