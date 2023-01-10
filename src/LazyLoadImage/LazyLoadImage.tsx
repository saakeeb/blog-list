import { useRef, useEffect, RefObject } from 'react';
import { LoadingProps } from './LoadingProps';

const LazyLoadImage = ({ src, alt, height, width }: LoadingProps) => {
    // const imageRef: RefObject<HTMLImageElement> = useRef(null);
    // const imageRef: RefObject<HTMLImageElement> = useRef(new Image());
    const imageRef = useRef<HTMLImageElement>(null);
    useEffect(() => {
        const options: IntersectionObserverInit = {};
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (imageRef.current) {
                        imageRef.current.src = src;
                        imageRef.current.alt = alt;
                        imageRef.current.height = height;
                        imageRef.current.width = width;
                        observer.unobserve(imageRef.current);
                    }
                }
            });
        }, options);

        if (imageRef.current) {
            observer.observe(imageRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [src, alt, height, width]);

    return (
        <img ref={imageRef} />
    );
};

export default LazyLoadImage;
