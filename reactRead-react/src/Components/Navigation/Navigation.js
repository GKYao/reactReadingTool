import React from 'react'

const Navigation = ({onRouteChange,isSignedIn}) => {
        if (isSignedIn){
            return(
                <nav style={{display: 'flex',justifyContent:'flex-end'}}>
                <p onClick={() => onRouteChange('signout')} className='f3 fw6 link dim underline pa3 pointer white'>Sign Out</p>
                <p onClick={() => onRouteChange('profile')} className='f3 fw6 link dim underline pa3 pointer white'>Profile</p>
                </nav>);}
        else{
            return(
                <nav style={{display: 'flex',justifyContent:'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className='f3 fw6 link dim underline pa3 pointer white'>Sign In</p>
                <p onClick={() => onRouteChange('register')} className='f3 fw6 link dim underline pa3 pointer white'>Register</p>
                </nav>);
        }
}

export default Navigation;