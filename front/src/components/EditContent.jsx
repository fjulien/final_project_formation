import React from 'react';
import './EditContent.scss';

const EditContent = (props) => {
  const {
    title,
    editContent,
    content,
    onChange,
    bolleanToEdit,
  } = props;

  return (
    <p className="EditContent">
      <span>
        {bolleanToEdit ? title : ''}
      </span>
      {bolleanToEdit ? (
        <label htmlFor={title}>
          <input
            className="input_edit"
            required
            id={title}
            type="text"
            name={title}
            onChange={onChange}
            value={editContent}
          />
        </label>
      ) : (<span className="">{content}</span>)}
    </p>
  );
};

export default EditContent;
