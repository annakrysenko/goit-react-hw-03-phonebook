import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ filter, handleFilter }) => {
  return (
    <label name="filter" className={styles.wrapper}>
      <span className={styles.text}>You can find contacts by name</span>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={handleFilter}
        className={styles.input}
      />
    </label>
  );
};

Filter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default Filter;
