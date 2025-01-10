import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import { Avatar } from '../../../../ui';
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
  onUpdate?: VoidFunction;
}

export const Message: React.FC<Props> = memo(function Message({
  // userId,
  author,
  avatar,
  content,
  isSender,
  createdAt,
  className,
  messageId,
  onUpdate,
}) {
  const { deleteMessage } = useSocket();

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <div
            className={cn(
              `hover:bg-background lg:w-8/12 bg-gray-200 w-5/6 flex justify-between p-2 duration-100 
             rounded-xl cursor-pointer
              ${isSender && 'bg-gray-600 text-white p-3 ml-auto hover:bg-gray-500'} `,
              className,
            )}>
            <div className="flex justify-between items-center ">
              <div className="flex items-center gap-x-3 ">
                <Avatar src={avatar} size="md" />

                <div className="flex flex-col justify-center ">
                  <h4 className="text-blue-700 font-semibold">{!isSender ? author : ''}</h4>
                  <p>{content}</p>
                </div>
              </div>
            </div>
            <span className="text-sm">{dayjs(createdAt).format('HH:mm')}</span>
          </div>
        </DropdownTrigger>

        <DropdownMenu aria-label="Chat actions">
          <DropdownItem key="report">Закрепить</DropdownItem>
          <>
            {isSender && (
              <>
                <DropdownItem key="update" onPress={onUpdate}>
                  Изменить
                </DropdownItem>

                <DropdownItem
                  key="delete"
                  color="danger"
                  className="text-danger"
                  onPress={() => deleteMessage({ messageId })}>
                  Удалить
                </DropdownItem>
              </>
            )}
          </>
        </DropdownMenu>
      </Dropdown>
    </>
  );
});
