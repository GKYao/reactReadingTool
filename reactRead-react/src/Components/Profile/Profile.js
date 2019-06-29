import React, { Component } from 'react';

class Profile extends Component {
    render() {
        const {name,array,onRouteChange}=this.props;
        if (array) {
          const words = array.map(function(word,index){
            return (
            <div key={index}>
                <div className='fl w-30 pa2 boarder-box'>
                <div className='col-lg-4' key={index}>
                    <p className='f3 fw6 link dim pa3 pointer white'>
                        {word}
                    </p>
                </div>
                </div>
            </div>
            )
          })  
          return (
            <div>            
                <p className='f3 fw6 pa3 white'>Welcome {name}</p>
                <p className='f3 fw6 pa3 white'>Here is the vocabulary you need to review</p>
                {words}
                <button 
                    className='w-30 grow f4 link ph3 pv2 dib white bg-light-red' 
                    onClick={()=>onRouteChange('home')}
                    >Back</button>
            </div>
          )
        }
        return <div>You don't have anything in vocabulary yet</div>
      }

}

export default Profile;