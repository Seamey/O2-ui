// 'use client'

// import React from 'react'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'
// import { cn } from '@/lib/utils'
// import MinimalTiptapEditor from '@/components/Components/texteditor/minimal-tiptap'
// import { useAddBlogMutation } from '@/app/redux/service/blog'
// import type { JSONContent } from '@tiptap/react'
// import { ChevronLeft } from 'lucide-react'
// import { useRouter } from 'next/navigation'
// import { toast } from 'sonner'


// const BlogSchema = Yup.object().shape({
//     title: Yup.string().required('Title is required'),
//     youtube_videos: Yup.string().required('Social media link is required!'),
//     tags: Yup.string().required('Tags are required!'),
//     content: Yup.mixed<JSONContent>()
//         .test('has-content', 'Content is required', (value): value is JSONContent => {
//             if (!value || value.type !== 'doc' || !Array.isArray(value.content)) {
//                 return false
//             }

//             return value.content.some((node: any) => {
//                 if (node.type === 'paragraph') {
//                     return (
//                         Array.isArray(node.content) &&
//                         node.content.some(
//                             (child: any) => typeof child.text === 'string' && !!child.text.trim()
//                         )
//                     )
//                 }
//                 return ['image', 'heading', 'blockquote'].includes(node.type)
//             })
//         })
//         .required('Content is required'),
// })

// export default function AddBlogComponent() {

//     const [createBlog, { isLoading }] = useAddBlogMutation()
//     const router = useRouter()

//     return (
//         <div className="pr-6 pl-4 max-w-3xl mx-auto ">
//             <div className="flex items-center pr-4 py-7 gap-8">
//                 <div className="p-2 bg-gray-100 rounded-full">
//                     <ChevronLeft size={24} onClick={() => router.back()} className="cursor-pointer text-primary" />
//                 </div>
//                 <h1 className="text-2xl font-bold text-center">Create a New Blog</h1>
//             </div>

//             <Formik
//                 initialValues={{
//                     title: '',
//                     content: { type: 'doc', content: [{ type: 'paragraph' }] },
//                     youtube_videos: '',
//                     tags: '',
//                 }}
//                 validationSchema={BlogSchema}
//                 onSubmit={async (values, { resetForm }) => {
//                     try {

//                         const content = values.content as any
//                         let plainText = ''
//                         let image = ''

//                         if (content?.content && Array.isArray(content.content)) {
//                             plainText = content.content
//                                 .filter((node: any) => node.type === 'paragraph')
//                                 .map((node: any) =>
//                                     node.content?.map((child: any) => child.text).join(' ') || ''
//                                 )
//                                 .join('\n')

//                             image =
//                                 content.content.find(
//                                     (node: any) => node.type === 'image' && node.attrs?.src
//                                 )?.attrs?.src || ''
//                         }


//                         await createBlog({
//                             title: values.title,
//                             content: plainText,
//                             image: image,
//                             youtube_videos: values.youtube_videos
//                                 .split(',')
//                                 .map((v) => v.trim()),
//                             tags: values.tags.split(',').map((v) => v.trim()),
//                         }).unwrap()

//                         resetForm()
//                         toast.success("Create Blog successful!", {
//                             style: {
//                                 background: "#22bb33",
//                                 color: "white"
//                             }
//                         })
//                     } catch (err:any) {
//                         console.error('Create blog failed:', err)
//                         if (err?.status === 422) {
//                             toast.error(
//                                 <div className="flex items-center gap-3">
//                                     <div>
//                                         <p className="font-semibold text-white text-md">Submission Failed</p>
//                                         <p className="text-sm text-white">
//                                             Your blog post must include <strong>both text and one image</strong>.
//                                         </p>
//                                     </div>
//                                 </div>,
//                                 {
//                                     style: {
//                                         background: '#e0391f',
//                                         padding: '12px 16px',
//                                         borderRadius: '8px',
//                                         color: "white"
//                                     },
//                                 }
//                             )
//                         } else {
//                             toast.error('Something went wrong. Please try again.')
//                         }
//                     }
//                 }}

//             >
//                 {({ values, setFieldValue }) => (
//                     <Form className="space-y-6 px-3">
//                         <div>
//                             <label className="block mb-1 font-medium">Title <span className='text-red-500'>*</span></label>
//                             <Field
//                                 name="title"
//                                 className={cn('w-full border p-2 rounded-xl')}
//                                 placeholder="Enter blog title"
//                             />
//                             <ErrorMessage
//                                 name="title"
//                                 component="div"
//                                 className="text-red-500 text-sm"
//                             />
//                         </div>
//                         <div>
//                             <label className="block mb-1 font-medium">Soical media Video <span className='text-red-500'>*</span></label>
//                             <Field
//                                 name="youtube_videos"
//                                 className={cn('w-full border p-2 rounded-xl')}
//                                 placeholder="Enter Social media video links (comma separated)"
//                             />
//                             <ErrorMessage
//                                 name="youtube_videos"
//                                 component="div"
//                                 className="text-red-500 text-sm"
//                             />
//                         </div>

//                         <div>
//                             <label className="block mb-1 font-medium">Tags <span className='text-red-500'>*</span></label>
//                             <Field
//                                 name="tags"
//                                 className={cn('w-full border p-2 rounded-xl')}
//                                 placeholder="Enter tags (comma separated)"
//                             />
//                             <ErrorMessage
//                                 name="tags"
//                                 component="div"
//                                 className="text-red-500 text-sm"
//                             />
//                         </div>

//                         <div>
//                             <label className="block mb-1 font-medium">Content <span className='text-red-500'>*</span></label>
//                             <MinimalTiptapEditor
//                                 value={values.content}
//                                 onChange={(json) => setFieldValue('content', json)}
//                                 className="bg-white rounded-2xl px-3 text-lg mt-2"
//                                 placeholder='Start typing ...'
//                             />
//                             <ErrorMessage
//                                 name="content"
//                                 component="div"
//                                 className="text-red-500 text-sm mt-1"
//                             />
//                         </div>

//                         <div className="flex justify-end gap-2 pb-5">
//                             <button
//                                 type="button"
//                                 onClick={() => router.back()}
//                                 className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 disabled={isLoading}
//                                 className={cn(
//                                     'bg-primary text-white px-4 py-2 rounded-lg',
//                                     isLoading && 'opacity-50 cursor-not-allowed'
//                                 )}
//                             >
//                                 {isLoading ? 'Submitting...' : 'Submit Blog'}
//                             </button>
//                         </div>


//                         {/* <div className="mt-8 p-4 bg-gray-100 rounded text-wrap w-[500px]">
//               <h3 className="text-lg font-semibold mb-2 text-wrap w-[550px]">
//                 Form Values (Debug):
//               </h3>
//               <pre>{JSON.stringify(values, null, 2)}</pre>
//             </div> */}
//                     </Form>
//                 )}
//             </Formik>
//         </div>
//     )
// }



'use client'

import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { cn } from '@/lib/utils'
import MinimalTiptapEditor from '@/components/Components/texteditor/minimal-tiptap'
import { useAddBlogMutation } from '@/app/redux/service/blog'
import type { JSONContent } from '@tiptap/react'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'


const BlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    youtube_videos: Yup.string().required('Social media link is required!'),
    tags: Yup.string().required('Tags are required!'),
    content: Yup.mixed<JSONContent>()
        .test('has-content', 'Content is required', (value): value is JSONContent => {
            if (!value || value.type !== 'doc' || !Array.isArray(value.content)) {
                return false
            }
            return value.content.some((node: any) => {
                if (node.type === 'paragraph') {
                    return (
                        Array.isArray(node.content) &&
                        node.content.some(
                            (child: any) => typeof child.text === 'string' && !!child.text.trim()
                        )
                    )
                }
                return ['image', 'heading', 'blockquote'].includes(node.type)
            })
        })
        .required('Content is required'),
})

export default function AddBlogComponent() {
    const [createBlog, { isLoading }] = useAddBlogMutation()
    const router = useRouter()
    const [showPopup, setShowPopup] = useState(false)

    return (
        <div className="pr-6 pl-4 max-w-3xl mx-auto ">
            <div className="flex items-center pr-4 py-7 gap-8">
                <div className="p-2 bg-gray-100 rounded-full">
                    <ChevronLeft size={24} onClick={() => router.back()} className="cursor-pointer text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-center">Create a New Blog</h1>
            </div>

            <Formik
                initialValues={{
                    title: '',
                    content: { type: 'doc', content: [{ type: 'paragraph' }] },
                    youtube_videos: '',
                    tags: '',
                }}
                validationSchema={BlogSchema}
                onSubmit={async (values, { resetForm }) => {
                    try {
                        const content = values.content as any
                        let plainText = ''
                        let image = ''

                        if (content?.content && Array.isArray(content.content)) {
                            plainText = content.content
                                .filter((node: any) => node.type === 'paragraph')
                                .map((node: any) =>
                                    node.content?.map((child: any) => child.text).join(' ') || ''
                                )
                                .join('\n')

                            image =
                                content.content.find(
                                    (node: any) => node.type === 'image' && node.attrs?.src
                                )?.attrs?.src || ''
                        }

                        await createBlog({
                            title: values.title,
                            content: plainText,
                            image: image,
                            youtube_videos: values.youtube_videos
                                .split(',')
                                .map((v) => v.trim()),
                            tags: values.tags.split(',').map((v) => v.trim()),
                        }).unwrap()

                        resetForm()
                        setShowPopup(true) // show popup here
                    } catch (err: any) {
                        console.error('Create blog failed:', err)
                        if (err?.status === 422) {
                            toast.error(
                                <div className="flex items-center gap-3">
                                    <div>
                                        <p className="font-semibold text-white text-md">Submission Failed</p>
                                        <p className="text-sm text-white">
                                            Your blog post must include <strong>both text and one image</strong>.
                                        </p>
                                    </div>
                                </div>,
                                {
                                    style: {
                                        background: '#e0391f',
                                        padding: '12px 16px',
                                        borderRadius: '8px',
                                        color: "white"
                                    },
                                }
                            )
                        } else {
                            toast.error('Something went wrong. Please try again.')
                        }
                    }
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form className="space-y-6 px-3">

                        {/* --- form fields --- */}
                        {/* title */}
                        <div>
                            <label className="block mb-1 font-medium">Title <span className='text-red-500'>*</span></label>
                            <Field
                                name="title"
                                className={cn('w-full border p-2 rounded-xl')}
                                placeholder="Enter blog title"
                            />
                            <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* youtube */}
                        <div>
                            <label className="block mb-1 font-medium">Social media Video <span className='text-red-500'>*</span></label>
                            <Field
                                name="youtube_videos"
                                className={cn('w-full border p-2 rounded-xl')}
                                placeholder="Enter Social media video links (comma separated)"
                            />
                            <ErrorMessage name="youtube_videos" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* tags */}
                        <div>
                            <label className="block mb-1 font-medium">Tags <span className='text-red-500'>*</span></label>
                            <Field
                                name="tags"
                                className={cn('w-full border p-2 rounded-xl')}
                                placeholder="Enter tags (comma separated)"
                            />
                            <ErrorMessage name="tags" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* content */}
                        <div>
                            <label className="block mb-1 font-medium">Content <span className='text-red-500'>*</span></label>
                            <MinimalTiptapEditor
                                value={values.content}
                                onChange={(json) => setFieldValue('content', json)}
                                className="bg-white rounded-2xl px-3 text-lg mt-2"
                                placeholder='Start typing ...'
                            />
                            <ErrorMessage name="content" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* buttons */}
                        <div className="flex justify-end gap-2 pb-5">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={cn(
                                    'bg-primary text-white px-4 py-2 rounded-lg',
                                    isLoading && 'opacity-50 cursor-not-allowed'
                                )}
                            >
                                {isLoading ? 'Submitting...' : 'Submit Blog'}
                            </button>
                        </div>

                        {/* Success Popup */}
                        {showPopup && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white p-6 rounded-xl text-center space-y-4 max-w-sm">
                                    <h2 className="text-xl font-semibold">Please wait for admin approval</h2>
                                    <p className="text-gray-600">Your blog has been submitted successfully. Admin will review it shortly.</p>
                                    <button
                                        onClick={() => {
                                            setShowPopup(false)
                                            router.push('/blog') // or wherever you want to navigate
                                        }}
                                        className="bg-primary text-white px-4 py-2 rounded-lg"
                                    >
                                        OK
                                    </button>
                                </div>
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    )
}
