import React from 'react';
import PropTypes from 'prop-types';

function DiscussionCategory({ categories, onSelectCategory }) {
  return (
    <div className="discussion-category">
      <h4>Kategori Populer</h4>
      {categories.map((category) => (
        <div key={category} className="category-item" onClick={() => onSelectCategory(category)}>
          <span>
            #
            {category}
          </span>
        </div>
      ))}
    </div>
  );
}

const discussionCategoryShape = {
  categories: PropTypes.array.isRequired,
};

DiscussionCategory.propTypes = {
  ...discussionCategoryShape,
  onSelectCategory: PropTypes.func,
};

DiscussionCategory.defaultProps = {
  onSelectCategory: null,
};

export default DiscussionCategory;
