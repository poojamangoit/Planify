import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, ScrollView, Text, View} from 'react-native';
import styles from './styles';
import Header from '../../../components/Header';
import PlusIcon from '../../../components/PlusIcon';
import Title from '../../../components/Title';
import {useDispatch, useSelector} from 'react-redux';
import Checkbox from '../../../components/Checkbox';
import firestore from '@react-native-firebase/firestore';
import {setToUpdate} from '../../../store/tasks';
import Categories from '../../../components/Categories';
import {categories} from '../../../constants/categories';

const Task = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState('all');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const tasks = useSelector(state => state.tasks.data);

  useEffect(() => {
    if (category && category !== 'all') {
      const filtered = tasks?.filter(task => task.category === category);
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks);
    }
  }, [category, tasks]);

  const onTaskUpdated = item => {
    firestore()
      .collection('Tasks')
      .doc(item?.uid)
      .update({
        checked: !item.checked,
      })
      .then(() => {
        dispatch(setToUpdate());
      });
  };
  const renderTask = ({item}) => {
    return (
      <View style={styles.row}>
        <Checkbox checked={item.checked} onPress={() => onTaskUpdated(item)} />
        <Text style={[styles.taskText, item?.checked ? styles.checked : {}]}>
          {item.title}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Tasks" />

      <FlatList
        ListHeaderComponent={
          <View style={{marginBottom: 24}}>
            <Title type="thin">To Do Tasks</Title>
            <Categories
              categories={[{label: 'All', value: 'all'}, ...categories]}
              selectedCategory={category}
              onCategoryPress={setCategory}
            />
          </View>
        }
        data={filteredTasks}
        renderItem={renderTask}
        keyExtractor={item => String(item?.uid)}
      />

      <PlusIcon />
    </SafeAreaView>
  );
};

export default React.memo(Task);
