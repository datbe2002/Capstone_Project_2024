import { StyleSheet } from 'react-native';

import { Text, View } from '../../../components/Themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

export default function TabOneScreen() {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>hello world</Text>
      <View>
        <TouchableOpacity onPress={() => router.replace('/(auth)/introduce')}>
          <Text>hello from tab 1</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
