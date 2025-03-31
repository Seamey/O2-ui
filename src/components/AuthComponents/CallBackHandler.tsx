// 'use client';

// import React, { useEffect, useState, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAppDispatch } from '@/redux/hooks';
// import { setAccessToken } from '@/redux/feature/auth/authSlice';

// const CallbackHandler: React.FC = () => {
//   const router = useRouter();
//   const [error, setError] = useState<string | null>(null);
//   const processedCode = useRef<string | null>(null);
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     const handleCallback = async () => {
//       try {
//         const searchParams = new URLSearchParams(window.location.search&filter);
//         const code = searchParams.get('code');

//         if (!code) {
//           setError('No authorization code received');
//           return;
//         }

//         // Prevent processing the same code multiple times
//         if (processedCode.current === code) {
//           return;
//         }
//         processedCode.current = code;

//         console.log('Sending code to backend:', code);

//         const response = await fetch('/api/auth/callback', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ code }),
//         });

//         const data = await response.json();
//         dispatch(setAccessToken(data.accessToken));
//         router.push('/');
//       } catch (error) {
//         console.error('Login error:', error);
//         if (error instanceof Error) {
//           setError(error.message || 'An unexpected error occurred');
//         }
//       }
//     };

//     handleCallback();
//   }, [router, dispatch]);

//   if (error) {
//     return (
//       <div className="p-4 bg-red-100 text-red-700 rounded">
//         <p>Error: {error}</p>
//         <button
//           onClick={() => router.push('/')}
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Return to Login
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="text-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
//         <p>Processing login...</p>
//       </div>
//     </div>
//   );
// };

// export default CallbackHandler;
// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAppDispatch } from '@/redux/hooks';
// import { setAccessToken } from '@/redux/feature/auth/authSlice';
// import Loading from '../General/Loading';

// const CallbackHandler: React.FC = () => {
//   const router = useRouter();
//   const [error, setError] = useState<string | null>(null);
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     const handleCallback = async () => {
//       try {
//         const searchParams = new URLSearchParams(window.location.search&filter);
//         const code = searchParams.get('code');
//         console.log('Received code:', code);
//         if (!code) {
//           setError('No authorization code received');
//           return;
//         }

//         const response = await fetch('/api/auth/callback', {

//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ code }),
//         });
//         console.log("response handler called",response)

//         if (!response.ok) {
//           const data = await response.json();
//           throw new Error(data.message || 'Authentication failed');
//         }

//         const data = await response.json();
//         console.log('Access token Data: ', data.accessToken);
//         console.log('Login response data: ', data);
//         dispatch(setAccessToken(data.accessToken));
//         router.push('/');
//       } catch (error) {
//         setError(error instanceof Error ? error.message : 'An unexpected error occurred');
//       }
//     };

//     handleCallback();
//   }, [router, dispatch]);

//   if (error) {
//     return (
// <div className='w-96 bg-red-300 h-96'>error{error}</div>)
//   }

//   return (
//     <div className='w-96 bg-red-300 h-96'><Loading/></div>)
// };

// export default CallbackHandler;
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setAccessToken} from "@/app/redux/features/auth/authSlice";
import {useAppDispatch} from "@/app/redux/hooks";


const CallbackHandler: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get('code');
        console.log('Received code:', code);

        if (!code) {
          setError('No authorization code received');
          return;
        }

        const response = await fetch('/api/auth/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
          credentials: 'include', // Ensure cookies are sent
        });
        console.log("response handler called",response)

        if (!response.ok) {
          try {
            const errorData = await response.json();
            console.error('Error response from API:', errorData);
            throw new Error(errorData.message || 'Authentication failed');
          } catch (err) {
            console.error('Error parsing response:', err);
            throw new Error('An unexpected error occurred');
          }
        }

        const data = await response.json();
        console.log('Access token:', data.accessToken);

        // Store access token in Redux
        // dispatch(setAccessToken(data.accessToken));

        // Optional: Verify the /me endpoint


        // Redirect to the home page after successful login
        router.push('/');
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      }
    };

    handleCallback();
  }, [router, dispatch]);

  if (error) {
    // console.log("error",error);
    <div className="flex justify-center items-center h-screen">
      
      {/* <h1 className='text-red-500'>hello</h1> */}
      {/*      <Loading/>*/}
    </div>
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {/* <h1 className='text-red-500'>hello</h1> */}
        {/* <Loading/> */}
    </div>
  );
};

export default CallbackHandler;
