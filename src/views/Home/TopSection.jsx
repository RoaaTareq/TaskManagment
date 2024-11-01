import React, { useEffect, useState } from 'react';
import Heading from '../../components/Typography/Heading1'; // Ensure this path is correct
import style from '../../assets/style/home.module.css';
import Button from '../../components/Button/Button';
import MainImage from '../../assets/video/ai-service-management-platform.png'

function TopSection() {

    return (
        <section className={style.Main_section}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-6">
                        <Heading 
                            level={1} 
                            text="Welcome to My Website, Start Organizing tasks with smooth experience" 
                            className="text-white" 
                        />
                       
                       
                            <Button className={`mt-4 mb-4  ${style.btn_register}`}>
                                Register Now!
                            </Button>
                       
                    </div>
                    <div className='col-6'>
                   <img src={MainImage} alt="" className={style.main_img} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TopSection;
