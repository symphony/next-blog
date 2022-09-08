import Link from 'next/link';

function PaginationItem({ index }) {

    return (
        <Link className={itemClassName} href={'/posts/' + index} shallow={true}>
            {index}
        </Link>
    )
}

export default PaginationItem;