import styles from './CardComponent.module.css';
import {Card} from "react-bootstrap";
import {useHistory} from "react-router-dom";

let history;

function cardClickHander(id) {
    history.push('/product/' + id)
}

const CardComponent = (props) => {
    history = useHistory()
    return (
        <Card className={styles.card + ` text-center ${styles[props.className]}`} onClick={() => cardClickHander(props.data.id)}>
            {props.data.discount !== '0' && <span className={styles.discount}>{`-${props.data.discount}%`}</span>}
            <div className={styles["card-image-div"]}>
                <Card.Img className={styles["card-img"]} src={props.data.image}/>
            </div>
            <div className="card-body">
                <h5 className="card-title">
                    {props.data.title}
                </h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">CAS No.: {props.data.cas}</li>
                <li className={styles.price + ' list-group-item'}>
                    {props.data.discount !== '0' && <span className={styles.mrp}>&#8377;{props.data.mrp}</span>}
                    &nbsp;&#8377;{props.data.price + '/' + props.data.weight}
                </li>
            </ul>
        </Card>
    )
}

export default CardComponent;