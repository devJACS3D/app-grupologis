import React, { Component, useEffect } from "react";
import { WebView } from "react-native-webview";
import { Button, Modal, View } from "react-native";
import { colors, heightPercentageToPx } from ".";
import { Text } from "react-native";
import SvgVisualize from "../assets/images/components/helpBox/SvgVisualize";
import LoaderItemSwitchDark from "../components/common/loaders/LoaderItemSwitchDark";

// Author:    Hetmann Wilhelm Iohan
// Email:     contact@react-ui-kit.com
// Web:       https://react-ui-kit.com
// YouTube:   https://www.youtube.com/react-ui-kit

// This is a basic example showing how to use Zendesk Chat Widget using a webview inside a modal and a html code
// Currently Zendesk Chat SDK doesn't support React-Native so
// this is a standalone example using just a HTML code and JS widget

// How to use
// 1. copy/paste the zendesk_chat_key from resource #3 link
// 2. originWhitelist is set to "about:blank" to open any links outside the WebView Modal
// 3. customize the widget using resource #2 link
// 4. from a web browser and as an agent open resource #1 link to chat with clients from the app

// Resources
// 1. Zendesk Chat Agent url: https://splendchat.zendesk.com/chat/agent
// 2. Zendesk Chat API Key: https://splendchat.zendesk.com/chat/agent?#widget/getting_started
// 3. Zendesk Web Widget: https://developer.zendesk.com/embeddables/docs/widget/core

class ZendeskChat extends Component {
  state = {
    showChat: true,
    loading: true,
  };

  chatHTML() {
    const { title, user, zendesk_chat_key } = this.props;
    return `
        <!DOCTYPE html>
        <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Chat | ${title}</title>
                <!-- Start of Zendesk Widget script -->
                <script id="ze-snippet"
                    src="https://static.zdassets.com/ekr/snippet.js?key=${zendesk_chat_key}"> </script>
                <!-- End of Zendesk Widget script -->
                <style type="text/css">html { background: transparent; } .msgLoad {padding-top: 250px; display: flex; justify-content: center; align-items: center;}</style>
            </head>
            <body>
              <div class="msgLoad">
                <h3>Espere un momento</h3>
              </div>
                <script>
                  document.addEventListener( 'DOMContentLoaded', function( event ) {
                    // zE('webWidget', 'prefill', {
                    //   name: { value: "${user.name}", readOnly: true },
                    //   email: { value: "${user.email}", readOnly: true },
                    //   phone: { value: "${user.phone}", readOnly: true }
                    // });
                    // zE('webWidget', 'identify', { name: "${user.name}", email: "${user.email}" });
                    zE('messenger', 'open');
                    zE('messenger:on', 'close', () => window.ReactNativeWebView.postMessage("close"));
                  });
                </script>
            </body>
        </html>
    `;
  }

  render() {
    const { showChat } = this.state;
    const userAgent = "YourApp";

    return (
      <View style={{ flex: 1 }}>
        {showChat ? (
          <View style={{ flex: 1 }}>
            <WebView
              useWebKit
              style={{
                // display: loading ? "none" : "flex",
                // flex: loading ? 0 : 1,
                flex: 1,
                // opacity: loading ? 0 : 1,
              }}
              hideKeyboardAccessoryView
              source={{
                html: this.chatHTML(),
                baseUrl: "https://static.zdassets.com",
              }}
              showsVerticalScrollIndicator={false}
              applicationNameForUserAgent={userAgent}
              onMessage={({ nativeEvent }) => {
                nativeEvent.data === "close" &&
                  this.setState({ showChat: false });
              }}
              originWhitelist={["*"]}
              messagingEnabled={true}
              // shouldStartLoadWithRequestHandler={({ url }) => url.startsWith("about:blank")}
            />
          </View>
        ) : (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              top: 130,
            }}
          >
            <SvgVisualize />
            <LoaderItemSwitchDark />
          </View>
        )}
      </View>
    );
  }
}

ZendeskChat.defaultProps = {
  title: "Test",
  user: {
    name: "name prueba",
    email: "prueba@mail.com",
    phone: "12345678",
  },
  zendesk_chat_key: "e1180f20-f981-4a7b-bbc7-6a42560dd999",
  // get the key from the code snippet found at:
  // https://splendchat.zendesk.com/chat/agent?#widget/getting_started
};

export default ZendeskChat;
