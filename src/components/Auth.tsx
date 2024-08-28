import React from 'react';
import { signInWithGoogle, signOut } from '../firebase';

interface Props {
  user: any | null;
}

const Auth: React.FC<Props> = ({ user }) => {
  return (
    <div className="auth">
      {user ? (
        <div>
          <img src={user.photoURL} alt={user.displayName} />
          <p>Welcome, {user.displayName}</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign In with Google</button>
      )}
    </div>
  );
};

export default Auth;