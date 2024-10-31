import React from 'react';
import Card from '../../components/Card/Card'; 
import style from '../../assets/style/feature.module.css'
function Features({features}){
    return(
        <section className={style.features}>
           <div className="container">
           <h2 className="text-center">Our Features</h2>
            <div className="row  d-flex">
                {features.map((feature, index) => (
                    <div className="col-md-4" key={index}> 
                        <Card 
                            title={feature.title}
                            content={feature.content}
                            image={feature.image}
                            
                          
                        />
                    </div>
                ))}
            </div>
           </div>
        </section>
    )
}

export default Features