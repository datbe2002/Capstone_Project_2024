import { StyleSheet } from 'react-native';

import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CenterSection from '../../../components/Menu/CenterSection';
import UserSection from '../../../components/Menu/UserSection';
import VerifyAlert from '../../../components/Setting/VerifyAlert';

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
      <VerifyAlert />
      <CenterSection activeButton={activeButton} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});
