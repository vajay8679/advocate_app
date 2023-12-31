import React, {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import {useDispatch, useSelector} from 'react-redux';
import {
  getConnectionMessages,
  onDeleteConversation,
  onDeleteMessage,
  onEditMessage,
  onSendMessage,
} from '../../../../redux/actions';
import SendMessage from './SendMessage';
import MessagesList from './MessageList';
import moment from 'moment';
import Header from './Header';
import PropTypes from 'prop-types';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import AppsHeader from '../../../../@crema/core/AppsContainer/AppsHeader';
import AppsFooter from '../../../../@crema/core/AppsContainer/AppsFooter';
import {MessageType} from '../../../../@crema/services/db/apps/chat/connectionList';
import {useAuthUser} from '../../../../@crema/utility/AuthHooks';
import SimpleBarReact from 'simplebar-react';

import {styled} from '@mui/material/styles';

const ScrollbarWrapper = styled(SimpleBarReact)(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    height: `calc(100% - 132px)`,
  };
});
const ScrollChatNoMainWrapper = styled('div')(() => {
  return {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  };
});

const ChatViewContainer = ({selectedUser}) => {
  const [message, setMessage] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const userMessages = useSelector(({chatApp}) => chatApp.userMessages);
  const dispatch = useDispatch();
  const {user} = useAuthUser();

  let _scrollBarRef = useRef();
  useEffect(() => {
    dispatch(getConnectionMessages(selectedUser.channelId));
  }, [dispatch, selectedUser]);

  useEffect(() => {
    if (
      userMessages &&
      userMessages.messageData &&
      userMessages.messageData.length > 0
    ) {
      if (_scrollBarRef?.current) {
        const scrollEl = _scrollBarRef.current.getScrollElement();
        scrollEl.scrollTop = scrollEl.scrollHeight;
      }
    }
  }, [userMessages, _scrollBarRef]);

  const sendFileMessage = (fileMessage) => {
    const data = {
      ...fileMessage,
      sender: user.id,
      time: moment().format('llll'),
    };
    dispatch(onSendMessage(selectedUser.channelId, data));
  };

  const onSend = (message) => {
    const data = {
      ...selectedMessage,
      message,
      message_type: MessageType.TEXT,
      sender: user.id,
      time: moment().format('llll'),
    };

    if (isEdit) {
      data.edited = true;
      dispatch(onEditMessage(selectedUser.channelId, data));
      setMessage('');
      setIsEdit(false);
      setSelectedMessage(null);
    } else {
      dispatch(onSendMessage(selectedUser.channelId, data));
      setMessage('');
    }
  };

  const onClickEditMessage = (data) => {
    if (data.message_type === MessageType.TEXT) {
      setIsEdit(true);
      setMessage(data.message);
      setSelectedMessage(data);
    }
  };

  const deleteMessage = (messageId) => {
    dispatch(onDeleteMessage(selectedUser.channelId, messageId));
  };

  const deleteConversation = () => {
    dispatch(onDeleteConversation(selectedUser.channelId));
  };

  return (
    <Box
      sx={{
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '& .apps-header': {
          minHeight: 72,
        },
      }}
    >
      <AppsHeader>
        <Header
          selectedUser={selectedUser}
          deleteConversation={deleteConversation}
        />
      </AppsHeader>

      {userMessages && user ? (
        <ScrollbarWrapper ref={_scrollBarRef}>
          <MessagesList
            userMessages={userMessages}
            authUser={user}
            selectedUser={selectedUser}
            onClickEditMessage={onClickEditMessage}
            deleteMessage={deleteMessage}
          />
        </ScrollbarWrapper>
      ) : (
        <ScrollChatNoMainWrapper>
          <Box
            component='span'
            sx={{
              fontSize: 18,
              color: 'grey.500',
            }}
          >
            <IntlMessages id='chatApp.sayHi' /> {selectedUser.name}
          </Box>
        </ScrollChatNoMainWrapper>
      )}

      <AppsFooter>
        <SendMessage
          currentMessage={message}
          sendFileMessage={sendFileMessage}
          onSendMessage={onSend}
        />
      </AppsFooter>
    </Box>
  );
};

export default ChatViewContainer;

ChatViewContainer.defaultProps = {};

ChatViewContainer.propTypes = {
  selectedUser: PropTypes.object.isRequired,
};
