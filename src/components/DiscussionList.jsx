import React from 'react';
import PropTypes from 'prop-types';
import DiscussionItem, { threadItemShape } from './DIscussionItem';
import DiscussionCategory from './DiscussionCategory';

function DiscussionList({
  threads, like, dislike, categories, onSelectCategory,
}) {
  return (
    <div className="discussion-list">
      <DiscussionCategory onSelectCategory={onSelectCategory} categories={categories} />
      <h2>Disksusi tersedia</h2>
      {
            threads.map((thread) => (
              <DiscussionItem
                key={thread.id}
                {...thread} /* eslint-disable-line react/jsx-props-no-spreading */
                like={like}
                dislike={dislike}
              />
            ))
         }
    </div>
  );
}

DiscussionList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default DiscussionList;
