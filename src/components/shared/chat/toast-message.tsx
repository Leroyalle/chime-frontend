import { RoutesEnum } from "../../../../@types";
import Router from 'next/router';

interface Props {
    chatId: string;
    senderName: string;
}

export const ToastMessage: React.FC<Props> = ({ chatId, senderName }) => {


    
    return (
        <div className="flex flex-col gap-2" >
            <p className="text-sm font-medium text-gray-700">New message from:</p>
            <p className="text-blue-500 font-bold cursor-pointer">{senderName}</p>
        </div>

    );
};