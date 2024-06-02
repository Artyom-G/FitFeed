import * as React from 'react';
import { useState, useEffect, createContext } from 'react';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Context = createContext();

const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userSignedIn, setUserSignedIn] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const signIn = (_user) => {
    setIsUserLoading(true);
    const userInfo = {
      uid: _user.uid,
      name: _user.displayName,
      email: _user.email,
      phoneNumber: _user.phoneNumber,
      profilePicture: _user.photoURL,
      username: _user.email,
    };
    setUser(userInfo);
    setUserSignedIn(true);
    writeToDatabase(userInfo);
    setUserLocally(userInfo);
    console.log('Signed in as ' + _user.displayName);
    setIsUserLoading(false);
  };

  const signOut = () => {
    setIsUserLoading(true);
    setUserSignedIn(false);
    setUser(null);
    deleteUserLocally();
    console.log('Signed Out!');
    setIsUserLoading(false);
  };

  const reloadUser = () => {
    setIsUserLoading(true);
    setUser(user);
    setIsUserLoading(false);
  }

  const writeToDatabase = async (userInfo) => {
    try {
      await database().ref(`/users/${userInfo.uid}`).set(userInfo);
    } catch (error) {
      console.log('writeToDatabase in App.jsx Error: ', error);
    }
  };

  const setUserLocally = async (userInfo) => {
    await AsyncStorage.setItem('@fitfeedUser', JSON.stringify(userInfo));
  };

  const deleteUserLocally = () => {
    AsyncStorage.removeItem('@fitfeedUser');
  };

  useEffect(() => {
    const Auth = getAuth();
    const unsubscribe = onAuthStateChanged(Auth, (_user) => {
      if (_user) {
        signIn(_user);
      } else {
        signOut();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Context.Provider value={{ user, userSignedIn, isUserLoading, signIn, signOut, reloadUser }}>
      {children}
    </Context.Provider>
  );
};

export default GlobalContextProvider;
