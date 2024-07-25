import React from 'react';
import { services, Skills } from '../constant';
import { Buttonlink } from './Buttonlink';
import './css/about.css';
import { Footer } from './Footer';

const Servicecard = ({ service }) => (
    <div className="flip-card">
        <div className='flip-container' style={{ background: `${service.image}` }}>
            <div className='filp-img'>
                <img src={service.image} alt='image' />
            </div>
            <div className="flip-card-inner">
                <div className='card-overlay'></div>
                <div class="flip-card-front">
                    <h3>{service.front}</h3>
                </div>
                <div className="flip-card-back">
                    <p>{service.back}</p>
                    <Buttonlink url={"/contacts"} cssClass={"btn btn3"} text={"Book a service"} />
                </div>
            </div>
        </div>
    </div>
);

const SkillsSction = ({ skill }) => (
    <div className='icon'>
        <img src={skill.icon} alt={skill.name} />
    </div>
);

export const About = () => {
    return (
        <section className='about'>
            <div className='about-section'>
                <div className='about-content'>
                    <h2>Introduction</h2>
                    <p>👨‍💻 Hi, I'm Sathishkumar, a 2021 graduate🎓 with a passion for crafting robust full-stack applications using frontend technologies such as HTML, CSS, Javascript, Bootstarp, Tailwind, SASS, React JS, and Reduxx and back-end technologies like Java, MySQL, and Spring Boot. As a seasoned <a className='rol-text' href='#' target='_blank'>Java Full-Stack Developer</a>🚀.</p>
                    <Buttonlink url={'/'} text={'View Resume →'} cssClass={'btn btn1'} />
                </div>
                <div className='service-cards'>
                    {services.map((service) => (
                        <Servicecard service={service} />
                    ))}
                </div>
            </div>

            <div className='skills-section'>
                <h2>My Skills</h2>
                <div className='icons-container'>
                    {Skills.map((skill) => (
                        <SkillsSction skill={skill} />
                    ))}
                </div>
            </div>
            <Footer />
        </section>
    )
}

export default About;
