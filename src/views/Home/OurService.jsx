// Service.js
import React from 'react';
import Card from '../../components/Card/Card'; 
import style from '../../assets/style/service.module.css'
const Service = ({ services }) => {
    return (
        <section className={style.service}>
           <div className="container">
           <h2 className="text-center">Our Services</h2>
            <div className="row  d-flex">
                {services.map((service, index) => (
                    <div className="col-md-4" key={index}> {/* Use col-md-4 for three cards on medium screens */}
                        <Card 
                            title={service.title}
                            content={service.content}
                            image={service.image}
                            
                          
                        />
                    </div>
                ))}
            </div>
           </div>
        </section>
    );
};

export default Service;
