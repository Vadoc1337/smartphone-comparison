import styles from './SmartphoneList.module.css';
import Dropdown from '../Dropdown/Dropdown';
import {TItemList} from '../../declarations';


function SmartphoneList({items}: TItemList) {
    let containerItem
    switch (items.length) {
        case 2: containerItem = `container_2`;
        break;
        case 4:containerItem= `container_4`;
        break;
        case 5: containerItem = `container_5`;
        break;
        case 6: containerItem = `container_6`;
        break;
        default: containerItem = `container_3`;
    };

    return (
        <ul className={styles[containerItem]}>
            {items.map((item) => (
                <li key={item.id} className={styles.smartphoneList}>
                    <div className={styles.item}>
                        <img src={item.img} alt={item.model}/>
                        <p className={styles.model}>{item.model}</p>
                    </div>
                    {items.length < 6 && <Dropdown id={item.id} showSearch={items.length < 3}/>}
                </li>
            ))}
        </ul>
    );
}

export default SmartphoneList;

