import PropTypes from 'prop-types';
import { LabelFilterEl } from './contactForm.styled';

export const Filter = ({ onChange }) => {
  const getFilterValue = evt => {
    onChange(evt.target.value);
  };

  return (
    <LabelFilterEl>
      Find contacts by name
      <input onChange={getFilterValue} type="text" />
    </LabelFilterEl>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};
