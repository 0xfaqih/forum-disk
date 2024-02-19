import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosCloseCircle } from 'react-icons/io';

function DiscussionInput({ addThread }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (field, value, maxLength) => {
    if (value.length < maxLength) {
      switch (field) {
        case 'title':
          setTitle(value);
          break;
        case 'category':
          setCategory(value);
          break;
        case 'body':
          setBody(value);
          break;
        default:
          break;
      }
    }
  };

  function addThreadHandler() {
    if (title.trim() && category.trim() && body.trim()) {
      addThread(title, category, body);
      setTitle('');
      setCategory('');
      setBody('');
      navigate('/');
    }
  }

  return (
    <div className="discussion-input">
      <div className="discussion-input-container">
        <div className="discussion-input-header">
          <h1>Buat diskusi baru</h1>
          <Link to="/">
            {' '}
            <IoIosCloseCircle />
            {' '}
          </Link>
        </div>
        <div className="discussion-input-main">
          <input
            className="input-title"
            placeholder="judul"
            value={title}
            onChange={(e) => handleInputChange('title', e.target.value, 300)}
          />
          <input
            className="input-category"
            placeholder="katergori"
            value={category}
            onChange={(e) => handleInputChange('category', e.target.value, 300)}
          />
          <textarea
            className="input-body"
            placeholder="Diskusi ..."
            value={body}
            onChange={(e) => handleInputChange('body', e.target.value, 400)}
          />
          <button type="submit" onClick={addThreadHandler}>
            Buat diskusi
          </button>
        </div>
      </div>
    </div>
  );
}

DiscussionInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default DiscussionInput;
