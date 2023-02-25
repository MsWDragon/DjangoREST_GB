import React from "react";
import {useParams} from "react-router-dom";

// const UsersList = (user) => {
//     return (<div>{user}</div>);
// };

const ProjectInfo = (projects) => {
    const {projectId} = useParams();
    const project = projects.projects.find(prj => prj.id === Number(projectId));

    return (
        <div className="container">
            <h1>{project.name}</h1>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Руководитель проекта
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                         data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            {project.adminUser}
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Репозиторий
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                         data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <a href={project.repoUrl} target="_blank" rel="noreferrer">{project.repoUrl}</a>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Участники проекта
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
                         data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            {project.users}
                            {/*{project.users.forEach(user => '<div>' + user + '</div>')}*/}
                            {/*{project.users.map((user) => <UsersList user={user}/>)}*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectInfo;
