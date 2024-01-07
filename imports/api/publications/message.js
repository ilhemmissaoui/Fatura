import { Meteor } from 'meteor/meteor';
import Conversation from '../../../collections/messages/conversation';
import Messages from '../../../collections/messages/message';

Meteor.publish('conversations', (function () {
    return Conversation.find({
        participants: this.userId
    }, {
        sort: {
            createdAt: -1
        }
    })
}))
Meteor.publish('admin-conversation', (function () {
    return Conversation.find({}, {
        sort: {
            createdAt: -1
        }
    })
}))
Meteor.publish('messages', (function (conversationId) {
    console.log(Messages.find({ conversationId }).fetch);
    return Messages.find({ conversationId });
}))

const createMessageObserver = (convIds, pub) => Messages.find({
    conversationId: {
        $in: convIds
    }
}).observeChanges({
    added: (id, fields) => {
        const lastMessage = Messages.find({ conversationId: fields.conversationId }, {
            sort: {
                createdAt: -1
            }
        }).fetch();
        lastMessage.map((e) => pub.added('lastMessages', e._id, e))
    }
})
Meteor.publish('lastMessages', (function () {
    const handler = Conversation.find({ participants: this.userId }, { reactive: true });
    let messageObserver = createMessageObserver(handler.fetch().map(e => e._id), this);
    const observer = handler.observeChanges({
        added: () => {
            messageObserver.stop();
            messageObserver = createMessageObserver(handler.fetch().map(e => e._id), this)
        }
    })
    this.onStop(() => {
        observer.stop();
        messageObserver.stop();
    })
}))