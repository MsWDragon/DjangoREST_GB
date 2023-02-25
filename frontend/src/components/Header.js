const Header = () => {
    return (
        <nav className="navbar navbar-dark bg-dark pb-0 mb-4 text-white">
            <div className="container">
                <ul className="nav nav-tabs nav-dark">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Пользователи</a>
                    </li>
                    <li className="nav-item navbar-dark">
                        <a className="nav-link text-light" href="#">Проекты</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href="#">ToDo</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;