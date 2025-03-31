'use client'

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { cn } from '@/lib/utils'
import MinimalTiptapEditor from '@/components/Components/texteditor/minimal-tiptap'
import { useUpdateBlogMutation } from '@/app/redux/service/blog'
import type { JSONContent } from '@tiptap/react'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useGetBlogDetailQuery } from '@/app/redux/service/blog'
import { useParams } from 'next/navigation'

const BlogSchema = (originalContent: JSONContent) =>
  Yup.object().shape({
    title: Yup.string().required('Title is required'),
    youtube_videos: Yup.mixed().test(
      'is-string-or-array',
      'youtube_videos must be a string or an array of strings',
      (value) => typeof value === 'string' || Array.isArray(value)
    ),
    tags: Yup.mixed().test(
      'is-string-or-array',
      'tags must be a string or an array of strings',
      (value) => typeof value === 'string' || Array.isArray(value)
    ),
    content: Yup.mixed<JSONContent>().test(
      'has-content-or-unchanged',
      function (value): value is JSONContent {
        // Check if content is empty or unchanged
        const isEmpty = !value?.content?.some((node: any) => {
          if (node.type === 'paragraph') {
            return node.content?.some((child: any) => child.text?.trim())
          }
          return ['image', 'heading', 'blockquote'].includes(node.type)
        })

        // Allow if it's same as original content
        const unchanged = JSON.stringify(value) === JSON.stringify(originalContent)

        return !isEmpty || unchanged
      }
    ),
  })

export default function UpdateBlogComponent() {
  const params = useParams()
  const uuid = params?.uuid as string
  const [updateBlog, { isLoading }] = useUpdateBlogMutation()
  const router = useRouter()
  const { data } = useGetBlogDetailQuery({ uuid })

  return (
    <div className="pr-6 pl-4 max-w-3xl mx-auto">
      <div className="flex items-center pr-4 py-7 gap-8">
        <div className="p-2 bg-gray-100 rounded-full">
          <ChevronLeft size={24} onClick={() => router.back()} className="cursor-pointer text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-center">Update Blog</h1>
      </div>

      <Formik
        initialValues={{
          title: data?.data.title || '',
          content: data?.data.content as JSONContent | undefined,
          youtube_videos: Array.isArray(data?.data.youtube_videos) ? data?.data.youtube_videos : [],
          tags: Array.isArray(data?.data.tags) ? data?.data.tags : [],
          // image: data?.data.image || ''
        }}
        enableReinitialize
        validationSchema={BlogSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const content = values.content as any
            let plainText = ''
            let image = ''

            // Handle content extraction for plain text and image
            if (content?.content && Array.isArray(content.content)) {
              plainText = content.content
                .filter((node: any) => node.type === 'paragraph')
                .map((node: any) => node.content?.map((child: any) => child.text).join(' ') || '')
                .join('\n')

              image =
                content.content.find((node: any) => node.type === 'image' && node.attrs?.src)?.attrs?.src || '' // Fallback to image from form values
            }

            await updateBlog({
              uuid,
              title: values.title || data?.data.title || "",
              content: plainText || data?.data.content || "",
              image: image,
              tags: (values.tags || data?.data.tags || "")
                .toString()
                .split(',')
                .map((v: string) => v.trim()),

              youtube_videos: (values.youtube_videos || data?.data.youtube_videos || '')
                .toString()
                .split(',')
                .map((v: string) => v.trim()),
            }).unwrap()

            resetForm()
            toast.success('Blog updated successfully!', {
              style: {
                background: '#22bb33',
                color: 'white',
              },
            })
            router.back()
          } catch (err: any) {
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
            <div>
              <label className="block mb-1 font-medium">Title</label>
              <Field
                name="title"
                className={cn('w-full border p-2 rounded-xl')}
                placeholder={data?.data.title || "Enter blog title"}
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Social Media Video</label>
              <Field
                name="youtube_videos"
                className={cn('w-full border p-2 rounded-xl')}
                placeholder={data?.data.youtube_videos || "Enter Social media video links (comma separated)"}
              />
              <ErrorMessage name="youtube_videos" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Tags</label>
              <Field
                name="tags"
                className={cn('w-full border p-2 rounded-xl')}
                placeholder={data?.data.tags || "Enter tags (comma separated)"}
              />
              <ErrorMessage name="tags" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Content</label>
              <MinimalTiptapEditor
                value={values.content}
                onChange={(json) => setFieldValue('content', json)}
                className="bg-white rounded-2xl px-3 text-lg mt-2"
                placeholder={data?.data?.content || "Start typing ..."}
              />
              <ErrorMessage name="content" component="div" className="text-red-500 text-sm mt-1" />
            </div>

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
                className={cn('bg-primary text-white px-4 py-2 rounded-lg', isLoading && 'opacity-50 cursor-not-allowed')}
              >
                {isLoading ? 'Updating...' : 'Update Blog'}
              </button>
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded text-wrap w-[500px]">
              <h3 className="text-lg font-semibold mb-2 text-wrap w-[550px]">Form Values (Debug):</h3>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
