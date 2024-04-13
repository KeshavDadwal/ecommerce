//  'use client';

// import { atom, useAtom } from 'jotai';
// import { getDefaultStore } from 'jotai';

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';

// export function createQueryString(queryObj: Record<string, any>): string {

//   const path = Object.entries(queryObj)
//     .map(([key, value]) => `${key}=${value}`)
//     .join('&');
//   return path;
// }

//  const store = getDefaultStore();
//  const queryAtom = atom('');

// export default function useQueryParam(pathname: string = '/') {
//   const [query, setQuery] = useAtom(queryAtom);
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       setLoading(false);
//     }, 500);
//     return () => clearTimeout(timeoutId);
//   }, [query]);

//   const clearQueryParam = (keys: string[]) => {
//     const url = new URL(window.location.href);
//     keys.forEach((item) => url.searchParams.delete(item));
//     setQuery(url.search);
//     router.push(`${pathname}${url.search}`);
//   };

//   const setQueryParams = (data: any) => {
//     let queryString = '';
//     if (typeof data !== 'string') {
//       queryString = createQueryString(data);
//     }
//     setQuery(queryString);
//   };

//   function getParams(url = window.location.href) {
//     const params: Record<string, any> = {};
//     new URL(url).searchParams.forEach(function (val: string, key: string) {
//       if (params[key] !== undefined) {
//         if (!Array.isArray(params[key])) {
//           params[key] = [params[key]];
//         }
//         params[key].push(val);
//       } else {
//         params[key] = val;
//       }
//     });
//     return params;
//   }

//   const updateQueryParams = (key: string, value: string | number | boolean) => {
//     if (!value) {
//       clearQueryParam([key]);
//       return;
//     }
//     const url = new URL(window.location.href);
//     url.searchParams.set(key, value.toString());
//     setQuery(url.search);
//     router.push(`${pathname}${url.search}`);
//   };

//   return {
//     query,
//     loading,
//     getParams,
//     setQueryParams,
//     updateQueryParams,
//     clearQueryParam,
//   };
// }

import { atom, useAtom } from 'jotai';
import { getDefaultStore } from 'jotai';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function createQueryString(queryObj: Record<string, any>): string {
  const path = Object.entries(queryObj)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return path;
}

const store = getDefaultStore();
const queryAtom = atom('');

export default function useQueryParam(pathname: string = '/') {
  const [query, setQuery] = useAtom(queryAtom);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const clearQueryParam = (keys: string[]) => {
    const url = new URL(window.location.href);
    keys.forEach((item) => url.searchParams.delete(item));
    setQuery(url.search);
    router.push(`${pathname}${url.search}`);
  };

  const setQueryParams = (data: any) => {
    let queryString = '';
    if (typeof data !== 'string') {
      queryString = createQueryString(data);
    }
    setQuery(queryString);
  };

  // function getParams(url = window.location.href) {
  //   const params: Record<string, any> = {};
  //   new URL(url).searchParams.forEach(function (val: string, key: string) {
  //     if (params[key] !== undefined) {
  //       if (!Array.isArray(params[key])) {
  //         params[key] = [params[key]];
  //       }
  //       params[key].push(val);
  //     } else {
  //       params[key] = val;
  //     }
  //   });
  //   return params;
  // }

  function getParams(url = window.location.href) {
    const params: Record<string, any> = {};

    try {
      const urlObj = new URL(url);
      urlObj.searchParams.forEach(function (val: string, key: string) {
        if (params[key] !== undefined) {
          if (!Array.isArray(params[key])) {
            params[key] = [params[key]];
          }
          params[key].push(val);
        } else {
          params[key] = val;
        }
      });
    } catch (error) {
      console.error('Error parsing URL:', error);
    }

    return params;
  }

  const updateQueryParams = (key: string, value: string | number | boolean) => {
    if (!value) {
      clearQueryParam([key]);
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.set(key, value.toString());
    setQuery(url.search);
    router.push(`${pathname}${url.search}`);
  };

  return {
    query,
    loading,
    getParams,
    setQueryParams,
    updateQueryParams,
    clearQueryParam,
  };
}
