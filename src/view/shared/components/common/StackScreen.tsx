import {SafeAreaView} from 'react-native-safe-area-context';

export function Screen({children, ...rest}) {
  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} {...rest}>
      {children}
    </SafeAreaView>
  );
}
