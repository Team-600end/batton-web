import { Client, Message } from '@stomp/stompjs';
import { NoticeMessage } from "@typess/Notice";
import PushNotice from './components/nav/PushNotice';

export function ConnectRabbit(memberId: number) {
  let stompClient: Client;

  const brokerURL = 'ws://localhost:15674/ws'; // WebSocket URL 문자열
  const queueName = '/queue/user.queue.' + memberId.toString();
  const headers = {
    login: 'guest',
    passcode: 'guest',
    'durable': 'true',
    'auto-delete': 'false',
  };

  stompClient = new Client({
    brokerURL: brokerURL, // WebSocket URL 문자열을 brokerURL로 사용
    connectHeaders: headers,
    debug: (msg) => {
      console.log(msg);
    },
  });

  stompClient.onConnect = (frame) => {
    console.log('Connected');
    const subscription = stompClient.subscribe(queueName, (message: Message) => {
      const body = JSON.parse(message.body) as NoticeMessage;

      console.log('Received Noticemessage:', body);

      // 메세지가 왔을 때 PushNotice 렌더링
    });
  };

  stompClient.activate();
}