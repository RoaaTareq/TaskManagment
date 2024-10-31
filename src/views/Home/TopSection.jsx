import React, { useEffect, useState } from 'react';
import Heading from '../../components/Typography/Heading1'; // Ensure this path is correct
import style from '../../assets/style/home.module.css';
import Button from '../../components/Button/Button';

function TopSection() {

    return (
        <section className={style.Main_section}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Heading 
                            level={1} 
                            text="Welcome to My Website, Start Organizing tasks with smooth experience" 
                            className="text-center text-white w-50 m-auto" 
                        />
                       
                       
                            <Button className={`mt-4 mb-4 m-auto d-flex justify-content-center ${style.btn_register}`}>
                                Register Now!
                            </Button>
                       
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TopSection;
