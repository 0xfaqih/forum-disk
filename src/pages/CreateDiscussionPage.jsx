import React from 'react';
import { useDispatch } from 'react-redux';
import DiscussionInput from '../components/DiscussionInput';
import { asyncAddThread } from '../states/threads/action';

function CreateDiscussionPage() {
  const dispatch = useDispatch();

  const onAddThread = (title, category, body) => {
    dispatch(asyncAddThread({ title, category, body }));
  };

  return (
    <section className="create-discussion">
      <DiscussionInput addThread={onAddThread} />
    </section>
  );
}

export default CreateDiscussionPage;
