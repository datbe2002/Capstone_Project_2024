import { StyleSheet } from 'react-native';

import { Text, View } from '../../../components/Themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomepageScreen() {
  const router = useRouter()
  return (
    <SafeAreaView>
      <Text>hello world</Text>
      <View>
        <TouchableOpacity onPress={() => router.replace('/(auth)/introduce')}>
          <Text>hello homepage</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
