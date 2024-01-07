import React, { useState } from 'react';
import MessageItem from './message';
import Chat from './Chat';
import { useTracker } from 'meteor/react-meteor-data'
import Conversations from '../../../../../collections/messages/conversation';
import Messanger from '../../../../../collections/messages/last_messages';


const Messages = () => {


    const [chat, setChat] = useState(['hello', 'hi!', 'do you want to chat?']);

    const { lastChat } = useTracker(() => {
        const lastMessagesHandle = Meteor.subscribe('lastMessages');
        const conversationsHandle = Meteor.subscribe('conversations');
        const conversationReady = conversationsHandle.ready();
        const lastMessagesReady = lastMessagesHandle.ready();
        const conversation = Conversations.findOne({ participants: Meteor.userId() });
        const lastChat = Messanger.find({ conversationId: conversation && conversation._id }, { sort: { createdAt: 1 } }).fetch();
        return {
            lastChat,
            conversation,
            conversationReady,
            lastMessagesReady
        }
    });


    return <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
        <div className="p-1">
            <div className="column">
                <section className="hero is-fullheight">
                    <div className="hero-head">
                        <header className="hero is-link is-bold">
                            <div className="hero-body">
                                <div className="container">
                                    <p className="title">
                                        Chat Messenger
                                    </p>
                                </div>
                            </div>
                        </header>
                    </div>

                    <div className="hero-body">
                        <MessageItem chat={lastChat} />
                    </div>

                    <div className="hero-foot">
                        <footer className="section is-small">
                            <Chat />
                        </footer>
                    </div>
                </section>
            </div>
        </div>
    </div>
}

export default Messages;