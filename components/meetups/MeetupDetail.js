import Image from 'next/image';
import classes from './MeetupDetail.module.css';

function MeetupDetail(props) {
    return (
        <section className={classes.detail}>
            <Image
                src={props.image}
                alt={props.title}
                width={640}
                height={420}
                loading='lazy'
                quality={80}
            />
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.description}</p>
        </section>
    );
}

export default MeetupDetail;
