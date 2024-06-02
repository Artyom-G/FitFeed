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
    writeToDatabase(userInfo);
    readFromDatabase(_user.uid);
    setUserLocally(user);
    console.log('Signed in as ' + _user.displayName);
    setIsUserLoading(false);
  }

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

  const reloadUserPlus = () => {
    setIsUserLoading(true);
    readFromDatabase(user.uid);
    setIsUserLoading(false);
  }

  const readFromDatabase = async (uid) => {
    database().ref(`/users/${uid}`)
      .once('value')
      .then(snapshot => {
        if(!snapshot.val().profile){
          const user = {
            ...snapshot.val(),
            profile: {
              name: snapshot.val().name,
              username: snapshot.val().email,
              title: 'Newcomer',
              bio: 'My empty bio',
              profilePicture: snapshot.val().profilePicture,
            }
          }
          setUser(user);
        }
        else{
          setUser(snapshot.val());
        }
      });
  }

  const writeToDatabase = async (userInfo) => {
    try {
      await database().ref(`/users/${userInfo.uid}/email`).set(userInfo.email);
      await database().ref(`/users/${userInfo.uid}/name`).set(userInfo.name);
      await database().ref(`/users/${userInfo.uid}/profilePicture`).set(userInfo.profilePicture);
      await database().ref(`/users/${userInfo.uid}/uid`).set(userInfo.uid);
      await database().ref(`/users/${userInfo.uid}/username`).set(userInfo.username);
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
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
      if (user) {
        signIn(user);
      } else {
        signOut();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Context.Provider value={{ user, userSignedIn, isUserLoading, signIn, signOut, reloadUser, reloadUserPlus }}>
      {children}
    </Context.Provider>
  );
};

export default GlobalContextProvider;
