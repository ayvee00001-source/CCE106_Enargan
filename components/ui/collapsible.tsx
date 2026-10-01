import { PropsWithChildren, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setIsOpen((value) => !value)}
        style={styles.heading}
      >
        <IconSymbol
          name="chevron.right"
          size={18}
          color={Colors[theme].icon}
          style={{
            transform: [{ rotate: isOpen ? '90deg' : '0deg' }],
          }}
        />

        <Text style={[styles.title, { color: Colors[theme].text }]}>
          {title}
        </Text>
      </TouchableOpacity>

      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
  },

  content: {
    marginLeft: 24,
    marginBottom: 10,
  },
});
