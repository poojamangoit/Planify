import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  outlined: {
    marginVertical: 12,
    paddingHorizontal: 24,
    paddingVertical: 13,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.grey,
    marginHorizontal: 24,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    color: colors.grey,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
});

export default styles;
