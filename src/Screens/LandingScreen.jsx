import React from 'react'

function LandingScreen() {
    setTimeout(()=>{
        window.location.href='/users/login';
    },1000);
    
  return (
    <div>
      <div className='container'>
         <h1>Welcome!</h1>
      </div>
    </div>
  )
}

export default LandingScreen
