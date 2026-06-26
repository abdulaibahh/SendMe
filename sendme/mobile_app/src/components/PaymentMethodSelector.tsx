import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '../core/theme';
import { textStyle } from '../core/theme/styles';
import type { PaymentMethod } from '../core/types/domain';

const paymentLabels: Record<PaymentMethod, string> = {
  orange_money: 'Orange Money',
  afrimoney: 'Afrimoney',
  cash_on_delivery: 'Cash on Delivery',
};

type PaymentMethodSelectorProps = {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
};

export function PaymentMethodSelector({ value, onChange }: PaymentMethodSelectorProps) {
  return (
    <View style={styles.container}>
      {(Object.keys(paymentLabels) as PaymentMethod[]).map((method) => {
        const selected = value === method;

        return (
          <Pressable
            key={method}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected }}
            onPress={() => onChange(method)}
            style={[styles.option, selected ? styles.selected : null]}
          >
            <View style={[styles.radio, selected ? styles.radioSelected : null]} />
            <Text style={[styles.label, selected ? styles.labelSelected : null]}>
              {paymentLabels[method]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  option: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
  },
  selected: {
    borderColor: theme.colors.deepGreen,
    backgroundColor: theme.colors.lightGreen,
  },
  radio: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: 9,
  },
  radioSelected: {
    borderWidth: 6,
    borderColor: theme.colors.deepGreen,
  },
  label: {
    ...textStyle('bodyStrong'),
  },
  labelSelected: {
    color: theme.colors.darkGreen,
  },
});
