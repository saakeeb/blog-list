import { Link } from 'react-router-dom';
import { SimplifiedNote } from './NoteListProps';
import styles from "../NoteList.module.css";
import LazyLoadImage from '../LazyLoadImage/LazyLoadImage';

const NoteCard = ({ id, title, tags }: SimplifiedNote) => {
    let NumberX = Math.floor((Math.random() * 300) + 1);
    return (
        <>
            <div
                className={`w-full block overflow-hidden bg-white border border-gray-600 rounded shadow ${styles.card}`}
            >
                <Link to={`/${id}`}>
                    <figure className="relative w-full transition-all duration-300 cursor-pointer scale-100 hover:scale-110">
                        <LazyLoadImage
                            alt="My image"
                            height={250}
                            src={`https://picsum.photos/id/${NumberX}/600/250`}
                            width={600}
                        />
                    </figure>
                    <div className="px-6 py-2">
                        <div className="font-bold text-xl mb-2">{title}</div>
                    </div>
                    {
                        tags.length > 0 && (
                            <div className="px-6 pt-2 pb-4">
                                {
                                    tags.map(tag => (
                                        <span
                                            key={tag.id}
                                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                                        >
                                            {tag.label}
                                        </span>
                                    ))
                                }
                            </div>
                        )
                    }

                </Link>
            </div>
        </>
    )
};

export default NoteCard;