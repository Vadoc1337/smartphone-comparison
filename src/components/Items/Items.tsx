import {useState, ChangeEvent, useEffect, useId} from 'react';

import RadioSelector from './RadioSelector/RadioSelector';
import styles from './Items.module.css';
import {
    fetchItems,
    addSpecifications,
    filterSpecifications,
    selectItems,
} from '../../store/slices/itemsSlice';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {
    DEFAULT_ITEMS_ON_PAGE,
    MAX_ITEMS_ON_PAGE,
    MIN_ITEMS_ON_PAGE,
} from '../../services/constants';
import ItemList from "../SmartphoneList/SmartphoneList";

function Items() {
    const dispatch = useAppDispatch();
    const {items, specifications} = useAppSelector(selectItems);
    const [limit, setLimit] = useState(DEFAULT_ITEMS_ON_PAGE);
    const id = useId();
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckBox = (el: ChangeEvent<HTMLInputElement>) => {
        if (el.target.checked) {
            setIsChecked(true)
            dispatch(filterSpecifications(specifications))
        } else {
            setIsChecked(false)
            dispatch(addSpecifications(items));
        }
    };

    const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setLimit(+e.target.value);
        setIsChecked(false);
    }

    useEffect(() => {
        dispatch(fetchItems(limit));
    }, [dispatch, limit]);

    return (
        <section className={styles.container}>
            <div className={styles.headingContainer}>
                <h1 className={styles.title}>Смартфоны</h1>
                <RadioSelector
                    label='Отобразить&nbsp;товары:'
                    start={MIN_ITEMS_ON_PAGE}
                    end={MAX_ITEMS_ON_PAGE}
                    current={limit}
                    onChange={handleFilter}
                />
            </div>
            <div className={styles.itemsContainer} onChange={handleCheckBox}>
                <div className={styles.checkbox}>
                    <input
                        type="checkbox"
                        id={`checkbox-${id}`}
                        onChange={handleCheckBox}
                        checked={isChecked}
                    />
                    <label htmlFor={`checkbox-${id}`}>Показать&nbsp;различия</label>
                </div>
                <ItemList items={items}/>
            </div>
        </section>
    );
}

export default Items;

