import React from 'react';
import { ValueofProjects } from '../constant';
import { Buttonlink } from './Buttonlink';



const ProjectValues = ({ project }) => (
    <div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <Buttonlink url={project.url} cssClass={"btn btn1"} text={"View Project"} />
        <hr />
    </div>
);

export const Projects = () => {
    return (
        <section className='projects'>
            {ValueofProjects.map((project) => (
                <ProjectValues project={project} />
            ))}
        </section>
    )
}

export default Projects;