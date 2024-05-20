import styles from './RadioSelector.module.css';
import {TPagination} from "../../../declarations";

function RadioSelector({label, start, end, current, onChange}: TPagination) {
    const range = Array.from({length: end - start + 1}, (_, index) => start + index);

    return (
        <div className={styles.container}>
            <span className={styles.text}>{label}</span>
            {range.map((el) => (
                <span key={el} className={`${styles.radio} ${styles.text}`}>
          <input
              id={`radio-${el}`}
              type='radio'
              checked={el === current}
              value={el}
              onChange={onChange}
          />
          <label htmlFor={`radio-${el}`}>{el}</label>
        </span>
            ))}
        </div>
    );
}

export default RadioSelector;