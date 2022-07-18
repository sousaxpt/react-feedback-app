import { createContext, useState, useEffect } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [feedback, setFeedback] = useState([]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = () => {
    fetch('/feedback?_sort=id&_order=desc')
      .then((resp) => resp.json())
      .then((data) => {
        setFeedback(data);
        setIsLoading(false);
      });
  };

  const addFeedback = (newFeedback) => {
    fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })
      .then((resp) => resp.json())
      .then((data) => setFeedback([data, ...feedback]));
  };

  const editFeedback = (item) => {
    setFeedbackEdit({
      item: item,
      edit: true,
    });
  };

  const updateFeedback = (id, updatedItem) => {
    fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setFeedback(feedback.map((item) => (item.id === id ? data : item)));
        setFeedbackEdit({
          item: {},
          edit: false,
        });
      });
  };

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      fetch(`/feedback/${id}`, { method: 'DELETE' }).then(() => {
        setFeedback(feedback.filter((item) => item.id !== id));
      });
    }
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        isLoading,
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
