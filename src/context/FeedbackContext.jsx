import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: '1',
      text: 'This is feedback Item 1',
      rating: 10,
    },
    {
      id: '2',
      text: 'This is feedback Item 2',
      rating: 1,
    },
    {
      id: '3',
      text: 'This is feedback Item 3',
      rating: 5,
    },
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  const editFeedback = (item) => {
    setFeedbackEdit({
      item: item,
      edit: true,
    });
  };

  const updateFeedback = (id, updatedItem) => {
    // setFeedback(feedback.map((item) => (item.id === id ? { ...item, ...updatedItem } : item)));
    setFeedback(feedback.map((item) => (item.id === id ? updatedItem : item)));
    setFeedbackEdit({
      item: {},
      edit: false,
    });
  };

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        addFeedback,
        editFeedback, // function that runs onClick
        deleteFeedback,
        feedbackEdit, // state object with item and the boolean
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
