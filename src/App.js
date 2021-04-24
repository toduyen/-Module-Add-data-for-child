import logo from './logo.svg';
import './App.css';
import {Fribaseconn} from  '../src/Firebaseconfig/Firebase';
import { useState } from 'react';
function App() { 
  
  const [giatri, themgiatri] = useState("")



  const addData = () =>  {
    let dulieu = Fribaseconn.database().ref('/Store');
     // Get a key for a new Post.
    dulieu.on('value',(snapshot)=>{
      var mang = [];
      snapshot.forEach((element) => {
        const name = element.val().name;
        if(name==='tuan'){
         mang.push(element.key);
        }
      })
      themgiatri(mang);
    })
  }


  const updateData = () => {
    var postData = {
      author: "tuanX",
      uid: 123124,
      body: "haha",
      title: "VIEW",
      starCount: 0,
      authorPic: "No cap"
    };
    var newPostKey = Fribaseconn.database().ref('/Store').push().key;
    var updates = {};
    updates['note/' + newPostKey] = postData;
    Fribaseconn.database().ref('/Store').child(giatri[0]).update(updates)
  }
  // new object
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button type='button' className='button' onClick={addData}>CLICK ME</button>

        <button type='button' className='button' onClick={updateData}>UPDATE</button>
      </header>
    </div>
  );
}

export default App;
