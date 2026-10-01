import { SymbolView } from 'expo-symbols';
import { StyleProp, ViewStyle } from 'react-native';

type IconMapping = Record<string, string>;

const MAPPING: IconMapping = {
  'house.fill': 'house.fill',
  'paperplane.fill': 'paperplane.fill',
  'chevron.left.forwardslash.chevron.right': 'chevron.left.forwardslash.chevron.right',
  'chevron.right': 'chevron.right',
  'person.crop.circle': 'person.crop.circle',
};

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: keyof typeof MAPPING;
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <SymbolView
      name={MAPPING[name] as any}
      size={size}
      tintColor={color}
      resizeMode="scaleAspectFit"
      style={style}
    />
  );
}
