import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then(res => res.json())
      .then(data => {
        setUser(data)
      })
  }, [])

const handleAddUser = event =>{
  event.preventDefault();
  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  console.log(name, email);
  const user = {name, email}

  fetch(`http://localhost:5000/users`,{
    method:'POST',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(user)
  })
  .then(res => res.json())
  .then(data => {
    const newUser = [...user, data];
    setUser(newUser)
  })
  .catch(err => console.log(err))

}

  return (
    <div className="App">

<form onSubmit={handleAddUser}>
  <input type='text' placeholder='enter your name' name='name' /><br/>
  <input type='email' name='email'  placeholder='enter your email' /><br/>
  <button>Add User</button>
</form>



      <h1>User: {user?.length} </h1>
      {

        user.map(u => <p key={u._id}>{u?.email}</p>)
      }
    </div>
  );
}

export default App;
