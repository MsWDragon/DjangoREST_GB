import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopyright} from "@fortawesome/free-solid-svg-icons";

const NowYear = () => {
    const CurrentDate = new Date();
    return CurrentDate.getFullYear();
};

const Footer = () => {
    return (
        <footer className="footer bg-dark fixed-bottom">
            <div className="container">
                <div className="text-muted py-3 text-center">
                    <NowYear/> <FontAwesomeIcon icon={faCopyright}/> Anton Mindlin
                </div>
            </div>
        </footer>
    );
};

export default Footer;
