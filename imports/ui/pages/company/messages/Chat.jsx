
import React from 'react';

export default Chat = () => {

    return <form onSubmit={(e) => {
        e.preventDefault();
        Meteor.call('sendMessage', { message: e.target.elements.message.value },
            (e) => {
                if (e) console.log(e);
            })
        e.target.reset();
    }}>
        <div className="field has-addons">
            <div className="control is-expanded">
                <input className="input"
                    name="message"
                    type="text"
                    placeholder="Type your message" />
            </div>
            <div className="control">
                <button className="button is-info">
                    Send Message
                </button>
            </div>
        </div>
    </form>
}


