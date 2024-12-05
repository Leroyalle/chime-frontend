import { useGetAllPostsQuery } from '@/services/post-api';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const useInfinityScrollPosts = () => {
  const [params, setParams] = useState({ skip: 0, take: 10 });
  const [shouldFetch, setShouldFetch] = useState(true);
  const { data } = useGetAllPostsQuery(params, { skip: !shouldFetch });
  const { ref, inView } = useInView();

  // FIXME: ЗАПРОС ОТПРАВЛЯЕТСЯ ДАЖЕ ЕСЛИ ВОЗВРАЩАЕТСЯ ПУСТОЙ МАССИВ

  const handleNextPage = () => {
    setParams((prev) => ({ ...prev, skip: prev.skip + prev.take }));
  };
  useEffect(() => {
    if (inView) {
      handleNextPage();
    }
  }, [inView]);

  return { data, ref };
};
