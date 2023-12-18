import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import Header from '../../../components/Header';
import PlusIcon from '../../../components/PlusIcon';
import Title from '../../../components/Title';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {setTasks} from '../../../store/tasks';
import StatusCard from '../../../components/StatusCard';
import moment from 'moment';

const Home = ({navigation}) => {
  const user = useSelector(state => state.user.data);
  const tasks = useSelector(state => state.tasks.data);
  const toUpdate = useSelector(state => state.tasks.toUpdate);
  const [count, setCount] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    firestore()
      .collection('Tasks')
      .where('userId', '==', user?.uid)
      .get()
      .then(querySnapshot => {
        const tasksList = [];
        querySnapshot.forEach(documentSnapshot => {
          tasksList.push({
            uid: documentSnapshot.id,
            ...(documentSnapshot.data() || {}),
          });
        });
        dispatch(setTasks(tasksList));
      });
  }, [user, toUpdate, dispatch]);

  useEffect(() => {
    if (tasks?.length) {
      const hightPriority = tasks?.filter(
        task => task.category === 'urgent' || task.category === 'important',
      );
      const today = moment(new Date()).format('YYYY-MM-DD');
      const dueDeadline = tasks?.filter(task => {
        const deadline = task?.deadline?.seconds * 1000;
        const deadlineFormatted = moment(deadline).format('YYYY-MM-DD');
        return moment(deadlineFormatted).isBefore(today);
      });
      const quickWin = tasks?.filter(task => task.category === 'quick_task');
      setCount({
        hightPriority: hightPriority?.length,
        dueDeadline: dueDeadline?.length,
        quickWin: quickWin?.length,
      });
    }
  }, [tasks]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Home" />
      <ScrollView>
        <Title type="thin">Daily Tasks</Title>
        <View style={styles.row}>
          <StatusCard label="High Priority" count={count?.hightPriority} />
          <StatusCard
            label="Due Deadline"
            type="error"
            count={count?.dueDeadline}
          />
          <StatusCard label="quick win" count={count?.quickWin} />
        </View>

        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('Tasks')}>
          <Text style={styles.label}>Check all my tasks</Text>
          <Text style={styles.subTitle}>
            See all tasks and filter them by categories you have selected when
            creating them
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <PlusIcon />
    </SafeAreaView>
  );
};

export default React.memo(Home);
