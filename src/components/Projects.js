import React from 'react';
import { ValueofProjects } from '../constant';
import { Buttonlink } from './Buttonlink';
import './css/project.css';
import { Footer } from './Footer';

const ProjectValues = ({ project }) => (
    <div className='project-container'>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <Buttonlink url={project.url} cssClass={"btn btn1 project-btn"} text={"View Project"} />
        <hr />
    </div>
);

export const Projects = () => {
    return (
        <section className='projects'>
            {ValueofProjects.map((project) => (
                <ProjectValues project={project} />
            ))}
            <Footer />
        </section>
    )
}

export default Projects;