import { Link } from 'react-router-dom';
import { SimplifiedNote } from './NoteListProps';
// import styles from "../NoteList.module.css";
import LazyLoadImage from '../LazyLoadImage/LazyLoadImage';

const NoteCard = ({ id, title, tags }: SimplifiedNote) => {
    let NumberX = Math.floor((Math.random() * 300) + 1);
    return (
        <>
            <div
                className="pb-4 w-full block overflow-hidden bg-white border border-gray-300 rounded transition ease-in-out duration-100 hover:-translate-y-1.5 hover:shadow-xl"
            >
                <Link to={`/${id}`}>
                    <figure className="relative w-full transition-all duration-300 cursor-pointer scale-100 hover:scale-110">
                        <LazyLoadImage
                            alt={title}
                            height={250}
                            src={`https://picsum.photos/id/${NumberX}/700/250`}
                            width={700}
                        />
                    </figure>
                    <div className="px-6 py-2">
                        <div className="font-bold text-xl mb-2">{title}</div>
                    </div>
                    {
                        tags.length > 0 && (
                            <div className="px-6 pt-2 pb-0 line-clamp-3 hover:line-clamp-none h-28 min-h-28 hover:h-full">
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