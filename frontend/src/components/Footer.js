const NowYear = () => {
    const CurrentDate = new Date();
    return CurrentDate.getFullYear();
};

const Footer = () => {
    return (
        <footer className="footer bg-dark fixed-bottom">
            <div className="container">
                <div className="text-muted py-3 text-center">
                    <NowYear/> &copy; Anton Mindlin
                </div>
            </div>
        </footer>
    );
};

export default Footer;
