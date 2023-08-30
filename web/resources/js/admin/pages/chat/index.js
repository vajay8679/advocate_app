import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import ChatSideBar from './ChatSideBar';
import ChatContent from './ChatContent';
import {getConnectionList} from '../../redux/actions';
import {useIntl} from 'react-intl';
import AppsContainer from '../../@crema/core/AppsContainer';

import { auth, db } from "../../firebase";
//import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const Chat = () => {
  const dispatch = useDispatch();
  //const [user] = useAuthState(auth);
  // requestForToken();
  const sendMessage = async () => {
    await addDoc(collection(db, "messages"), {
      text: 'Test',
      name: 'Nitin',
      //avatar: photoURL,
      createdAt: serverTimestamp(),
      uid: 'User_uid',
    });
  }

  useEffect(() => {
    //dispatch(getConnectionList());
  }, [dispatch]);
  //console.log('user', user)

  const {messages} = useIntl();
  return (
    <AppsContainer
      title={messages['chatApp.chat'].toString()}
      sidebarContent={<ChatSideBar />}
    >
      <button onClick={sendMessage}>Send Message</button>
      <ChatContent />
    </AppsContainer>
  );
};

export default Chat;
