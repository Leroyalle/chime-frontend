import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar } from '../../../ui';
import { RoutesEnum } from '../../../../../@types';
import dayjs from 'dayjs';
import { Dropdown, DropdownMenu, DropdownTrigger, DropdownItem } from '@nextui-org/react';
import { useSocket } from '@/lib/hooks';

interface Props {
  userId: string;
  messageId: string;
  author: string;
  avatar?: string;
  content: string;
  isSender: boolean;
  createdAt: Date;
  className?: string;
}

export const Message: React.FC<Props> = ({
  userId,
  author,
  avatar,
  content,
  isSender,
  createdAt,
  className,
  messageId
}) => {


  const socket = useSocket()


  const handleDeleteMessage = () => {
    console.log(messageId)
    socket.deleteMessage({ messageId })
  }


  const handlePatchMessage = () => {
    console.log(messageId)
    socket.deleteMessage({ messageId })
  }




  return (
    <>
      <Dropdown>

        <DropdownTrigger>
          <div className={cn('hover:bg-background p-2 duration-100 rounded-xl', className)}>
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-x-2">
                <Avatar src={avatar} size="md" />
                <div className="flex flex-col justify-center">
                  <h4 className="text-blue-700 font-semibold">
                    <a href={`${RoutesEnum.USER}/${userId}`}>{author}</a>
                  </h4>
                  <p>{content}</p>
                </div>
              </div>
              <span className="text-gray-600 text-sm">{dayjs(createdAt).format('HH:mm')}</span>
            </div>
          </div >
        </DropdownTrigger>

        <DropdownMenu aria-label="Chat actions">
          <DropdownItem key="report">Закрепить</DropdownItem>

          <DropdownItem key="change">
            Изменить
          </DropdownItem>

          <DropdownItem key="delete" color="danger" className="text-danger" onPress={handleDeleteMessage}>
            Удалить
          </DropdownItem>

        </DropdownMenu>

      </Dropdown >
    </>
  );
};
