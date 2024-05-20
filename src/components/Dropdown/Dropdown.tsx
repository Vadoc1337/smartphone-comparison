import {
    useState,
    useEffect,
    useRef,
    MutableRefObject,
    ChangeEvent,
} from 'react';

import styles from './Dropdown.module.css';

import {useAppDispatch, useAppSelector} from '../../store/store';
import {
    fetchItemsWithSearch,
    selectItems,
    changeItem,
} from '../../store/slices/itemsSlice';

import {TItems} from '../../declarations';

function Dropdown({id, showSearch}: { id: number, showSearch: boolean; }) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const menuRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const {searchedItems, exceptions} = useAppSelector(selectItems);

    useEffect(() => {
        if (!open) {
            return;
        }
        dispatch(fetchItemsWithSearch({search, exceptions}));
    }, [search, exceptions, dispatch, open]);

    useEffect(() => {
        const closeDropdown = (el: Event) => {
            const target = el.target as HTMLElement;
            if (!menuRef.current.contains(target)) {
                setSearch('');
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', closeDropdown);
        return () => document.removeEventListener('mousedown', closeDropdown);
    }, []);

    const openDropdown = () => setOpen(true);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleChangeItem = (item: TItems) => {
        dispatch(changeItem({id, item}));
    };

    return (
        <div className={styles.container}>
            <button
                onClick={openDropdown}
                className={styles.dropDownButton}
                type='button'>
                <svg
                    name="ShowMenu"
                    xmlns='http://www.w3.org/2000/svg'
                    width='30'
                    height='27'
                    viewBox='0 0 30 27'
                    fill='none'>
                    <path
                        d='M24.375 10.125L15 18.5625L5.625 10.125'
                        stroke='#0D5ADC'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                </svg>
            </button>
            <div
                ref={menuRef}
                className={
                    open
                        ? `${styles.menu} ${styles.active}`
                        : `${styles.menu} ${styles.inactive}`
                }>
                {showSearch && (
                    <input
                        type='text'
                        id={`search-${id}`}
                        onChange={handleSearch}
                        placeholder='Поиск'
                        value={search}
                        className={styles.search}
                    />
                )}
                <ul className={styles.items}>
                    {searchedItems.length ? (
                        searchedItems.map((item) => (
                            <li key={item.id} className={styles.listItem}>
                                <button
                                    type='button'
                                    onClick={() => handleChangeItem(item)}
                                    className={styles.changeButton}>
                                    <svg
                                        name="ChangeSmarpthone"
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='20'
                                        height='20'
                                        viewBox='0 0 20 20'
                                        fill='none'>
                                        <path
                                            d='M19.0909 4.54548H3.10384L6.09735 1.55191C6.45238 1.19694 6.45238 0.621302 6.09735 0.266272C5.74239 -0.0887575 5.16675 -0.0887575 4.81172 0.266272L0.266272 4.81172C-0.0887575 5.16669 -0.0887575 5.74233 0.266272 6.09735L4.81172 10.6428C4.98923 10.8203 5.2219 10.9091 5.45457 10.9091C5.68723 10.9091 5.9199 10.8203 6.09735 10.6428C6.45238 10.2878 6.45238 9.7122 6.09735 9.35717L3.10384 6.36366H19.0909C19.593 6.36366 20 5.95663 20 5.45457C20 4.95251 19.593 4.54548 19.0909 4.54548Z'
                                            fill='#36935B'
                                        />
                                        <path
                                            d='M15.1883 9.35717C14.8333 9.0022 14.2576 9.0022 13.9026 9.35717C13.5476 9.71214 13.5476 10.2878 13.9026 10.6428L16.8962 13.6364H0.90912C0.40706 13.6364 3.02863e-05 14.0434 3.02863e-05 14.5455C3.02863e-05 15.0475 0.40706 15.4546 0.90912 15.4546H16.8962L13.9027 18.4481C13.5476 18.8031 13.5476 19.3787 13.9027 19.7338C14.0801 19.9112 14.3128 20 14.5455 20C14.7781 20 15.0108 19.9112 15.1883 19.7337L19.7337 15.1883C20.0887 14.8333 20.0887 14.2576 19.7337 13.9026L15.1883 9.35717Z'
                                            fill='#36935B'
                                        />
                                    </svg>
                                </button>
                                <img
                                    src={item.img}
                                    alt={item.model}
                                    className={styles.itemImage}
                                />
                                <p className={styles.model}>{item.model}</p>
                            </li>
                        ))
                    ) : (
                        <p className={styles.notFound}>
                            Ничего не найдено
                        </p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Dropdown;

