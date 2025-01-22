'use server';

import { cookies } from 'next/headers';
import { TokensEnum } from '../types';

export async function deleteCookie() {
  (await cookies()).delete(TokensEnum.JWT);
}
