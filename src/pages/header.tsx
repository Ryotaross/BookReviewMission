import '../App.css';
import { useHistory } from 'react-router-dom';

function Header() {
  const history = useHistory();
  const handleLogout = ()=>{
    localStorage.removeItem("token")
    history.replace('/login');
  }

  return (
    <div className="Head">
      <ul>
        <li><a href="/profile">profile</a></li>
        <li><a href="/login">login</a></li>
        <li><a href="/signin">signin</a></li>
        <li><a href="/">Index</a></li>
        <li><a href="/new">New</a></li>
        <li><button onClick={handleLogout}>logout</button></li>
      </ul>
    </div>
  );
}

export default Header;