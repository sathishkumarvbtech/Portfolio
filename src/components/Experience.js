import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { experiences } from '../constant';
import './css/experience.css';

export const Experience = () => {
    return (
        <section>
            <VerticalTimeline>
                {experiences.map((experience) => (
                    <VerticalTimelineElement className="relative vertical-timeline-element--work"
                        contentStyle={{ background: "#FF7F3E", color: "#fff", }}
                        contentArrowStyle={{ borderRight: "7px solid  #FF7F3E" }}
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
        </section>
    )
}

export default Experience;