import React from 'react';
import image from './assets/003-image.svg';

export function Comment(){
    return(
       <div className="comment">
         <img className="comment__avatar" src={image} alt="#"/>
         <form className="comment__form">
           <input type="text" value="" disabled="true"/>
         </form>
       </div>
    );
}
