import React from 'react';
import './Article.css';
class Article extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loadingText:'Loading',
            translation:'',
            text:'', 
            x: 0, 
            y: 0,
            display:'none',
            email:props.email,
            password:props.password
        }
    }
    _onMouseUp(e) {
        this.setState({ 
            x: e.clientX + document.body.scrollLeft
            + document.documentElement.scrollLeft, 
            y: e.clientY + document.body.scrollTop
            + document.documentElement.scrollTop });
      }
    translate=(data)=>{
        this.setState({loadingText:'Loading'});
        fetch('http://localhost:3000/translate',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                word:data
            })
        })
        .then(response => response.json())
        .then(translation => {
          if(translation){
            this.setState({translation:translation})
            this.setState({loadingText:''})
          }
        })
    }
  
    addVocab=(data,id)=>{
        this.setState({loadingText:'Loading'});
        fetch('http://localhost:3000/vocab/insert',{
            method:'put',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                id:id,
                word:data
            })
        })
        .then(response => response.json())
        this.onSubmitSave();
    }
    onSubmitSave=()=>{
        fetch('http://localhost:3000/vocab/read',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                id:this.props.id
            })
        })
        .then(response => response.json())
        .then(data => {
            this.props.loadVocab(data[0].vocab);
        })
    }
    getSelectionText=()=> {
        if (window.getSelection) {
            this.setState({text:window.getSelection().toString()});
            this.setState({translation:''});
            this.translate(window.getSelection().toString());
            this.setState({display:'block'});
            if(window.getSelection().toString()==='')
            {this.setState({display:'none'});}
        } else if (document.selection && document.selection.type !== "Control"){
            this.translate(document.selection.createRange().text);
            this.setState({text:window.getSelection().toString()});
        }else{
            this.setState({translation:''});
        }
    }
    render(){
    const{onRouteChange,reading,id}=this.props;
    const{x,y,text,display,loadingText,translation}=this.state;
    return(
        <div className="center"  onClick={this.getSelectionText} onMouseUp={this._onMouseUp.bind(this)}>
            <p className="br white fw6 f4 lh-copy measure ">
                {reading}
                <br/>
                <button 
                    className='w-30 grow f4 link ph3 pv2 dib white bg-light-red' 
                    onClick={()=>onRouteChange('home')}
                    >Back</button>
            </p>
            <br/>
            <div 
            id="infoDiv" 
            className="tooltipDiv" 
            style={{display:display,left:x,top:y}}>
            {loadingText}{translation}<br/>
                <button 
                    className='w-40 grow f4 link ph3 pv2 dib white bg-light-blue' 
                    onClick={()=>this.addVocab(text,id)}
                    >Save
                </button>
            
            </div>
        </div>  
    );
}
}

export default Article;