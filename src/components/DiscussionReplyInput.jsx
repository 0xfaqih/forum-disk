import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoSendSharp } from 'react-icons/io5';

function DiscussionReplyInput({ addComment }) {
  const [text, setText] = useState('');

  function addcomment() {
    if (text.trim()) {
      addComment(text);
      setText('');
    }
  }

  function handleTextChange({ target }) {
    if (target.value.length <= 330) {
      setText(target.value);
    }
  }

  return (
    <div className="discussion-reply-input">
      <textarea placeholder="komentar..." value={text} onChange={handleTextChange} />
      <button type="submit" onClick={addcomment}>
        <IoSendSharp />
        {' '}
      </button>
    </div>
  );
}

DiscussionReplyInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default DiscussionReplyInput;
