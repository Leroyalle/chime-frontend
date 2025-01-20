import { MessageTypeEnum } from '../../../../../../../@types/dto';

export function isPostMessage(type: MessageTypeEnum): type is MessageTypeEnum.POST {
  return type === MessageTypeEnum.POST;
}
