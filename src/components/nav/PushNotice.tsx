import React, { useState, useEffect } from "react";
import { NoticeMessage } from "@typess/Notice";
import push_notice_bell from "@assets/images/icons/push_notice_bell.png";
import "./noticeSlide.css";

function PushNotice(noticeMessage: NoticeMessage) {
    const [showNotification, setShowNotification] = useState(true);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (showNotification) {
            // 4초 후에 알림 숨기기
            const hideNotificationTimeout = setTimeout(() => {
                setShowNotification(false);
                setTimeout(() => setVisible(false), 900);
            }, 4000);

            // 컴포넌트가 언마운트될 때 타이머 해제
            return () => clearTimeout(hideNotificationTimeout);
        }
    }, [showNotification]);

    return (
        <div>
            {visible && (
            <div className={`fixed bottom-8 right-8 z-99 ${showNotification ? "animate-slide-up" : "animate-slide-down"}`}>
                <div className="w-[280px] h-[110px] relative border border-gray-300 rounded-[10px]">
                    <div className="left-[36px] top-[40px] pr-[20px] absolute font-suitM">{noticeMessage.noticeContent}</div>
                    <div className="left-[36px] top-[16px] absolute text-black text-xs font-suitSB">새로운 알림</div>
                    <div className="w-[278px] h-[7px] top-0 absolute bg-primary-4 rounded-tl-[15px] rounded-tr-[15px]" />
                    <img className="w-5 h-5 left-[12px] top-[13px] absolute" src={push_notice_bell} />
                </div>
            </div>
            )};
        </div>
    );
}

export default PushNotice;