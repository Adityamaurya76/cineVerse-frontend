import "./Loader.scss";

const Loader = ({ text = "Loading..." }) => {
    return (
        <div className="loader">
            <div className="loader__container">
                <div className="loader__spinner">
                    <div className="loader__ring"></div>
                    <div className="loader__ring"></div>
                    <div className="loader__ring"></div>
                </div>
                {text && <p className="loader__text">{text}</p>}
            </div>
        </div>
    );
};

export default Loader;
