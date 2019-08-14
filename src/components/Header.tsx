import React from 'react';
import Spinner from 'react-spinkit';
//interface for props
interface HeaderProps {
  loading: boolean;
}
const Header: React.FC<HeaderProps> = props => {
  return (
    <header onClick={() => (window.location.href = '/')} className="App-header">
      {/* loader for main page */}
      {props.loading && <Spinner name="wordpress" className="mainLoader" />}
      <span className="title">Image Grid</span>
    </header>
  );
};

export default Header;
