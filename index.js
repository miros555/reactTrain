import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';


const initialState = [
'Smells like spirit',
'Enter Sandman'
];


function playlist(state=initialState, action){
	console.log(action);
	if(action.type==='ADD_TRACK'){
		return [...state, 
		  action.payload
		]
	}
return state;
		
}

const store=createStore(playlist);
		  


ReactDOM.render(<Provider store={store}>
<App /></Provider>, document.getElementById('root'));







/*
store.subscribe( ()=> {
    console.log(store.getState());
    
	const list = document.querySelector('.list');
    list.innerHTML = '';
    store.getState().forEach(elem=>{
	   const li=document.createElement('li');
	   li.textContent=elem;
	   list.appendChild(li);
       document.querySelector('.trackInput').value = '';
   })
});


store.dispatch({type:'ADD_TRACK', payload:'Smells like spirit. All right'});
store.dispatch({type:'ADD_TRACK', payload:'Enter Sandman'});


const addTrackBtn = document.querySelectorAll('.addTrack')[0];

addTrackBtn.addEventListener('click', ()=>{
	const trackName=document.querySelector('.trackInput').value;
	console.log('track name', trackName);
	store.dispatch({type:'ADD_TRACK', payload: trackName});
});
*/


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
