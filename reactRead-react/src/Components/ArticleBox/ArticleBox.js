import React from 'react';
import './ArticleBox.css';

const ArticleBox = ({onInputChange,onButtonSubmit}) => {
    return(
        <div>
            <p className='f2 white fw6'>
                {'Copy&Paste the Article You Woud Like to Read'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input 
                        className='f4 pa2 w-70 center' 
                        type='text' 
                        onChange={onInputChange} />
                    <button 
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-red' 
                        onClick={onButtonSubmit}
                        >Submit</button>
                </div>
            </div>
        </div>
    );
}

export default ArticleBox;