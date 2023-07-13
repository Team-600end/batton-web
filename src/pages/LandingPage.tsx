import React from 'react';
import landing_tmp_img from "../assets/images/landingPage/tmp_img.svg";

export default function LandingPage() {
    return (
        <div className='relative overflow-hidden flex items-center justify-center'>
            <img src={landing_tmp_img} className='mt-[7vh] scale-125'/>
        </div>
    );
};