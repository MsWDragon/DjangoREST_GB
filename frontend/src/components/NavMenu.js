import {faDiagramProject, faListCheck, faUsers, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const NavMenu = () => {
    return (
        <nav className="navbar navbar-dark bg-dark pb-0 mb-4 text-white">
            <div className="container">
                <ul className="nav nav-tabs nav-dark">
                    <li className="nav-item">
                        <a className="nav-link active" href="#"><FontAwesomeIcon icon={faUsers}/> Пользователи</a>
                    </li>
                    <li className="nav-item navbar-dark">
                        <a className="nav-link text-light" href="#"><FontAwesomeIcon
                            icon={faDiagramProject}/> Проекты</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href="#"><FontAwesomeIcon icon={faListCheck}/> ToDo</a>
                    </li>
                </ul>
                <div className="d-flex align-items-center w-50">
                    <form className="w-100 mb-1">
                        <input type="search" className="form-control" placeholder="Поиск..." aria-label="Search"/>
                    </form>

                    {/*<div className="flex-shrink-0 dropdown">*/}
                    {/*    <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle"*/}
                    {/*       id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">*/}
                    {/*        <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32"*/}
                    {/*             className="rounded-circle">*/}
                    {/*    </a>*/}
                    {/*    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">*/}
                    {/*        <li><a className="dropdown-item" href="#">New project...</a></li>*/}
                    {/*        <li><a className="dropdown-item" href="#">Settings</a></li>*/}
                    {/*        <li><a className="dropdown-item" href="#">Profile</a></li>*/}
                    {/*        <li>*/}
                    {/*            <hr className="dropdown-divider">*/}
                    {/*        </li>*/}
                    {/*        <li><a className="dropdown-item" href="#">Sign out</a></li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                </div>
            </div>
        </nav>
);
};

export default NavMenu;