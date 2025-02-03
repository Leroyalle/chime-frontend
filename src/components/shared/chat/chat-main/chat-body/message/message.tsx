import React, { memo } from 'react';
import { cn, getAbsoluteUrl } from '@/lib/utils';
import { Avatar } from '../../../../../ui';
import dayjs from 'dayjs';
import { Dropdown, DropdownTrigger } from '@nextui-org/react';
import { useSocket } from '@/lib/hooks';
import { Author, MessageTypeEnum } from '../../../../../../types/dto';
import { Actions, MainContent, SharedContent } from './components';

interface Props {
  userId: string;
  messageId: string;
  author: string;
  avatar: string | null;
  content: string | null;
  contentPost: string | null;
  imagePreview: string | null;
  postId: string | null;
  postAuthor: Author | null;
  postCreatedAt: Date | null;
  isSender: boolean;
  messageType: MessageTypeEnum;
  createdAt: Date;
  updatedAt: Date;
  onUpdate: VoidFunction;
  className?: string;
}

export const Message: React.FC<Props> = memo(function Message({
  userId,
  author,
  avatar,
  content,
  contentPost,
  imagePreview,
  postId,
  postAuthor,
  postCreatedAt,
  isSender,
  messageType,
  createdAt,
  updatedAt,
  className,
  messageId,
  onUpdate,
}) {
  const { deleteMessage } = useSocket();
  return (
    <Dropdown>
      <DropdownTrigger>
        <div
          className={cn(
            `text-black lg:w-8/12 bg-gray-200 hover:bg-gray-200/90 w-5/6 flex gap-x-2 p-2 duration-100 
             rounded-lg cursor-pointer
              ${isSender && 'bg-gray-600 text-white p-3 ml-auto hover:bg-gray-600/90'} `,
            className,
          )}>
          <div className="grid [grid-template-columns:auto_1fr] flex-1 gap-x-3">
            <Avatar
              src={avatar ? getAbsoluteUrl(avatar) : undefined}
              size="md"
              className="justify-self-start"
            />
            <div className="flex flex-1 flex-col gap-y-3">
              <MainContent userId={userId} author={author} content={content} />
              {messageType === MessageTypeEnum.POST && (
                <SharedContent
                  contentPost={contentPost}
                  imagePreview={imagePreview}
                  postId={postId}
                  postAuthor={postAuthor}
                  postCreatedAt={postCreatedAt}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between items-end">
            <span className="text-sm">{dayjs(createdAt).format('HH:mm')}</span>
            {dayjs(updatedAt).isAfter(createdAt) && (
              <span className="text-xs text-white/60">изменено</span>
            )}
          </div>
        </div>
      </DropdownTrigger>
      <Actions
        isSender={isSender}
        onUpdate={onUpdate}
        deleteMessage={() => deleteMessage({ messageId })}
      />
    </Dropdown>
  );
});
