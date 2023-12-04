import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNotification } from './reducers/notificationReducer';

const Notification = () => {
  // const dispatch = useDispatch();
  const votes = useSelector((state) => state.anecdotes.votes); // Замените на актуальный селектор для голосов
  const anecdote = useSelector((state) => state.anecdotes); // Замените на актуальный селектор для анекдотов
  const notificationContent = useSelector((state) => state.notification.content); // Замените на актуальный селектор для содержимого уведомлений

  useEffect(() => {
    // Создание уведомления при голосовании
    if (votes !== undefined) {
      dispatch(createNotification(`You voted "${anecdote.content}"`));
    }
  }, [dispatch, votes, anecdote]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  return (
    <div style={style}>
      {notificationContent}
    </div>
  );
};

export default Notification;

