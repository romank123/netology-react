import React from 'react';

export function Comment(){
    return(
       <div className="comment">
         <img className="comment__avatar" src="" />
         <form className="comment__form">
           <input type="text" value="" disabled="true"/>
         </form>
       </div>
    );
}
