import BookIndex from '../components/BookIndex';
import '../App.css';

function Header() {
  return (
    <div className="Head">
      <ul>
        <li><a href="/profile">profile</a></li>
        <li><a href="/login">login</a></li>
        <li><a href="/signin">signin</a></li>
      </ul>
    </div>
  );
}

export default Header;