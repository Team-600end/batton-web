import React, {useState, useEffect, useCallback} from "react";
import { NoticeMessage } from "@typess/Notice";
import { ConnectRabbit } from "./ConnectRabbit";
import PushNotice from "@components/nav/PushNotice";

function NoticeConnector({ memberId }: { memberId: number }) {
    const [message, setMessage] = useState<NoticeMessage | null>(null);
    const [bool_ean, setBool_ean] = useState(true);
    
    useEffect(() => {
      ConnectRabbit(memberId, setMessage);
      setBool_ean(false);
    }, []);

    useEffect(() => {
        ConnectRabbit(memberId, setMessage);
        setBool_ean(true);
      }, [message]);

    return (
      <div>
        {bool_ean && (message && (
          <PushNotice
            contentId={message!.contentId}
            noticeType={message!.noticeType}
            noticeContent={message!.noticeContent}
            noticeDate={message!.noticeDate}
            senderProfileImage={message!.senderProfileImage}
          />
        ))}
      </div>
    );
  };
  
  export default NoticeConnector;