import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";

const NotFound404 = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template text-center">
                        <h1>
                            Oops!</h1>
                        <h2>
                            404 Not Found</h2>
                        <div className="error-details">
                            Извините, произошла ошибка! Запрашиваемая страница не найдена!
                        </div>
                        <div className="error-actions mt-2">
                            <Link exact to="/" className="btn btn-primary btn-lg bg-dark">
                                <FontAwesomeIcon icon={faHome}/> Домой
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound404;
