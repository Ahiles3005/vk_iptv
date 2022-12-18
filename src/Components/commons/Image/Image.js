import {useImage} from 'react-image';
//import './Image.css';
import {LazyLoadImage} from 'react-lazy-load-image-component';

// const customPromise = (src) => {
//     let timer;
//     return new Promise((res, rej) => {df
//         const i = new Image();
//         i.onload = () => {
//             timer && clearTimeout(timer);
//             res();
//         };
//         i.onerror = rej;
//         i.src = src;
//         timer = setTimeout(() => {
//             i.src = undefined;
//             rej();
//         }, 1000000);
//     });
// };
//
// function MyImageComponent({url, altUrl, alt}) {
//     const {src} = useImage({
//         srcList: [url, altUrl],
//         imgPromise: customPromise,
//     });
//
//     return <img src={src} alt={alt}/>;
// }
//
// const ImageComponent = ({placeholderImage, ...props}) => {
//     return (
//         <Suspense fallback={<img src={placeholderImage} alt='placeholder'/>}>
//             <MyImageComponent {...props} />
//         </Suspense>
//     );
// };
//
// export default ImageComponent;


const ImageComponent = ({src,alt,wrapperClassName}) => (

    <LazyLoadImage
        alt={alt}
        // height={image.height}
        src={src} // use normal <img> attributes as props
        // width={image.width}
        wrapperClassName={wrapperClassName}
    />


);

export default ImageComponent;