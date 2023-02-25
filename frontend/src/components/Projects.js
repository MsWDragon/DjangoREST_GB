import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                <Link className="text-decoration-none text-dark" to={`/projects/${project.id}`}>{project.name}</Link>
            </td>
        </tr>
    );
};

const ProjectList = ({projects}) => {
    return (
        <div className="container">
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Проект</th>
                </tr>
                </thead>
                <tbody>
                {projects.map((project) => <ProjectItem project={project}/>)}
                </tbody>
            </table>
        </div>

    );
};

export default ProjectList;
