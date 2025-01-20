import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import { Avatar } from '../../../../../ui';
import dayjs from 'dayjs';
import { Dropdown, DropdownMenu, DropdownTrigger, DropdownItem } from '@nextui-org/react';
import { useSocket } from '@/lib/hooks';
import { Author, MessageTypeEnum } from '../../../../../../../@types/dto';
import Link from 'next/link';
import { RoutesEnum } from '../../../../../../../@types';
import { User } from '@nextui-org/react';
import { getAbsoluteUrl, getRelativeTime } from '@/lib';

interface Props {
  userId: string;
  messageId: string;
  author: string;
  avatar?: string;
  content: string | null;
  contentPost: string | null;
  imagePreview: string | null;
  postId: string | null;
  postAuthor: Author | null;
  postCreatedAt: Date | null;
  isSender: boolean;
  messageType: MessageTypeEnum;
  createdAt: Date;
  onUpdate?: VoidFunction;
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
  className,
  messageId,
  onUpdate,
}) {
  const { deleteMessage } = useSocket();
  console.log(imagePreview);

  const handleOpenPost = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <div
            className={cn(
              `text-black lg:w-8/12 bg-gray-200 hover:bg-gray-200/90 w-5/6 flex p-2 duration-100 
             rounded-lg cursor-pointer
              ${isSender && 'bg-gray-600 text-white p-3 ml-auto hover:bg-gray-600/90'} `,
              className,
            )}>
            <div className="grid [grid-template-columns:auto_1fr] flex-1 gap-x-3">
              <Avatar src={avatar} size="md" className="justify-self-start" />
              <div className="flex flex-1 flex-col gap-y-3">
                <div className="flex flex-col justify-center ">
                  <Link
                    href={`${RoutesEnum.USER}/${userId}`}
                    className="text-blue-700 font-semibold w-fit">
                    {author}
                  </Link>
                  <p>{content}</p>
                </div>
                {messageType === MessageTypeEnum.POST && (
                  <div className="flex flex-col gap-y-1">
                    <User
                      name={<Link href={`${RoutesEnum.POST}/${postId}`}>{postAuthor?.name}</Link>}
                      description={getRelativeTime(postCreatedAt)}
                      avatarProps={{
                        src: postAuthor?.avatar ? getAbsoluteUrl(postAuthor?.avatar) : undefined,
                        size: 'sm',
                      }}
                      className="justify-start"
                    />
                    {imagePreview && (
                      <img
                        src={getAbsoluteUrl(imagePreview)}
                        alt=""
                        className="w-full h-full aspect-[1/1] object-cover rounded-md"
                      />
                    )}
                    <p>{contentPost}</p>
                    <div
                      onPointerDown={handleOpenPost}
                      onPointerUp={handleOpenPost}
                      onClick={handleOpenPost}
                      className="grid place-items-center text-blue-500 font-semibold border border-blue-500 p-1 rounded-lg">
                      <Link href={`${RoutesEnum.POST}/${postId}`} className="w-full text-center">
                        Открыть пост
                      </Link>
                    </div>
                  </div>
                )}
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
