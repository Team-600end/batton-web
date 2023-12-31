import React, { useState, useEffect } from "react";
import { Client, Message } from "@stomp/stompjs";
import { NoticeMessage } from "@typess/Notice";
import PushNotice from "@components/nav/PushNotice";

interface MemberIdProps {
  memberId: number;
}

export function ConnectRabbit(props: MemberIdProps) {
  let stompClient: Client;
  const brokerURL = "ws://3.35.230.169:15674/ws"; // WebSocket URL 문자열
  const queueName = "/queue/user.queue." + props.memberId.toString();
  const headers = {
    // 헤더
    login: "guest",
    passcode: "guest",
    durable: "true",
    "auto-delete": "false",
  };
  const [message, setMessage] = useState<NoticeMessage>(); // 메세지 바디

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: brokerURL,
      connectHeaders: headers,
      debug: (msg) => {},
    });

    stompClient.onConnect = (frame) => {
      const subscription = stompClient.subscribe(queueName, (message: Message) => {
        const body = JSON.parse(message.body) as NoticeMessage;

        setMessage(body);

        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate(); // 구독 해제 및 연결 종료
    };
  }, []);

  return (
    <div>
      {message && (
        <PushNotice
          contentId={message.contentId}
          noticeType={message.noticeType}
          noticeContent={message.noticeContent}
          noticeDate={message.noticeDate}
          senderProfileImage={message.senderProfileImage}
        />
      )}
    </div>
  );
}
