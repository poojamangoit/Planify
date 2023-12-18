import React, {useState} from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const DateInput = ({value, onChange}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const onDateOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <TouchableOpacity onPress={onDateOpen} style={styles.outlined}>
        <Image
          resizeMode="contain"
          style={styles.icon}
          source={require('../../assets/calendar.png')}
        />
        <Text style={styles.text}>
          {moment(value).format('L') || 'Select Date...'}
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          onChange(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default React.memo(DateInput);
