import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { experiences } from '../constant';
import './css/experience.css';
import { Footer } from './Footer';

export const Experience = () => {
    return (
        <section>
            <VerticalTimeline>
                {experiences.map((experience) => (
                    <VerticalTimelineElement className="relative vertical-timeline-element--work"
                        contentStyle={{ background: "#2AD882", color: "#fff", }}
                        contentArrowStyle={{ borderRight: "7px solid #2AD882" }}
                        date={experience.duration}
                        iconStyle={{ background: '#fff' }}
                        icon={
                            <a className='experience-logo' href={experience.url} target='_blank'>
                                <img
                                    src={experience.logo}
                                    alt={experience.company}
                                    className=''
                                />
                            </a>
                        }
                    >
                        <div>
                            <h3>{experience.role}</h3>
                            <p style={{ margin: 0 }}>
                                {experience.company}
                            </p>
                        </div>

                        <ul>
                            {experience.points.map((point, index) => (
                                <li key={`experience-point-${index}`}>
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>
            <Footer />
        </section>
    )
}

export default Experience;