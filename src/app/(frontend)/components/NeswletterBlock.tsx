'use client'

import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { useState } from 'react'

type NewsletterProps = Extract<Page['layout'][0], { blockType: 'newsletter-form' }>
type FormState = {
  loading: boolean
  error: string | null
  success: boolean
}

export default function NewsletterBlock({ block }: { block: NewsletterProps }) {
  const [formData, setFormData] = useState({})

  const [formState, setFormState] = useState<FormState>({
    loading: false,
    error: null,
    success: false,
  })

  /**
   * Handles the form submission
   * @param e
   * @returns
   */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!block.form || typeof block.form !== 'object') return

    setFormState({
      loading: true,
      error: null,
      success: false,
    })

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())
    console.log(data)

    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        body: JSON.stringify({
          form: block.form.id,
          submissionData: Object.entries(data)?.map(([field, value]) => ({
            field,
            value: value as string,
          })),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }
      setFormState({
        loading: false,
        error: null,
        success: true,
      })

      //Reset the form
      ;(e.target as HTMLFormElement).reset()

      //Reset form after 5 seconds
      setTimeout(() => {
        setFormState({
          loading: false,
          error: null,
          success: false,
        })
      }, 5000)
    } catch (error) {
      console.error(error)
      setFormState({
        loading: false,
        error: 'Failed to submit form',
        success: false,
      })
    }
  }

  return (
    <div>
      <h1>Hello from Form</h1>
      {typeof block?.form === 'object' && block?.form?.title === 'newForm-1' && (
        <div>
          <h2>{block.heading}</h2>
          <form className="form" onSubmit={handleSubmit}>
            {block.form.fields?.map((field: any) => (
              <div key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  type={field.blockType}
                  name={field.name}
                  required={field.required}
                  placeholder={field.label}
                />
              </div>
            ))}
            {/* display error or success message */}
            {formState.error && <p style={{ color: 'red' }}>{formState.error}</p>}
            {formState.success ? (
              <div style={{ color: 'green' }}>
                <RichText data={block.form.confirmationMessage!} />
              </div>
            ) : (
              <button type="submit">{block.form.submitButtonLabel || 'Submit'}</button>
            )}
          </form>
        </div>
      )}
    </div>
  )
}
