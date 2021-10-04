import ProfileUpdate from '../components/ProfileUpdate';
import Header from './header';
import '../App.css';

function Profile() {
  return (
    <div className="App">
      <Header />
      <ProfileUpdate />
    </div>
  );
}

export default Profile;