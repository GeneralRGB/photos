import React from "react";

export default function DetailedCollection({ imageLinks, setDetailedView }) {
    return (
        <>
            <div className="collection-detailed">
                <img src={process.env.PUBLIC_URL + '/close.svg'} alt="" className="close-btn" onClick={() => setDetailedView(false)} />
                {imageLinks.map(el => <img src={el} alt="img" className="image-detailed" />)}
            </div>
        </>
    );
}