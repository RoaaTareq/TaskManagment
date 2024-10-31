import React from 'react'
import style from '../../assets/style/banner.module.css'
import Button from '../../components/Button/Button'
function Banner (){
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    return(
<section className={style.banner}>
    <div className="container">
        <div className="row">
        {!loggedInUser && (
            <div className="col-12">
                <h2 className='mt-4 mb-4 text-center text-white'> Get started with Trello today</h2>
               
                            <Button className={`mt-4 mb-4 m-auto d-flex justify-content-center ${style.btn_register}`}>
                                Register Now!
                            </Button>
                  
            </div>
                  )}
                     <h2 className='mt-4 mb-4 text-center text-white'> Thank you for use this System</h2>
        </div>
    </div>
</section>
    )
}
export default Banner ;