'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
// @ts-expect-error
import { InpostGeowidget } from 'react-inpost-geowidget'

interface InPostModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  setSelectedPackageMachine: (selectedPackageMachine: any) => void
}

export const InPostModal = ({ isOpen, setIsOpen, setSelectedPackageMachine }: InPostModalProps) => {
  const API_TOKEN =
    'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjIwNTc0NDM5MjIsImlhdCI6MTc0MjA4MzkyMiwianRpIjoiZTY2MTY0YjUtZjU4ZC00N2EyLThhNjUtNzQ3ZjJhNjQwZTc2IiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTpUYjM2M0VIYWhuaTl0c1paQW9PMXdzVkVzMzhpN3Y5Ui14VzcxbDBaYk1BIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiODEyMDk2NDgtYTc3ZC00NzVmLWJkMzQtNTg2MGIyN2RjMjFiIiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6IjgxMjA5NjQ4LWE3N2QtNDc1Zi1iZDM0LTU4NjBiMjdkYzIxYiIsImFsbG93ZWRfcmVmZXJyZXJzIjoiIiwidXVpZCI6IjIxODkwZmQyLWQ1NTYtNGUyOS1hZDA4LWExNWM5ZWFmNmUxMiJ9.FK3LLJ3NeR_Dy18VZVJZcFHHYV3tfVdhSwnr7k3D82bDr-Udt1_TCMnI9AHx3Xadp7ua_ASLc5rQKUqYxyUmM0OUZbV9XMjjurQjRsn6pB8TRZV6HOTGu4vlR3oU860kIjsI4lvKVbPmUdOiKw4T7gXhA0oaN0DwWErRBf9JR5gQJXH6esGmO-0O2EI1lGWYn2P3xjgselvhWf8YIycesd_Y97jpZNylh_KcBxOTGpj9OvEotqBJMc-Z3pSIS3nYCuKVS9WnSNOlxzFyqAPdhiV7zWos7wRuye5VdVHgn6-NMYpmC1QflBxpeJ2-HwLdeCzLVaJefNGEtY8Rv6uHww'

  const onPointCallback = (point: any) => {
    setSelectedPackageMachine(point)
    console.log('Object of selected point: ', point)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onClose={setIsOpen} className='relative z-10'>
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in'
      />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <DialogPanel
            transition
            className='relative w-[90vw] h-[90vh] transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all'
          >
            <div className='h-full bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
              <div className='h-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                <DialogTitle as='h3' className='text-base font-semibold text-gray-900'>
                  Wybierz Paczkomat
                </DialogTitle>
                <div className='h-[95%] mt-2'>
                  <InpostGeowidget token={API_TOKEN} onPoint={onPointCallback} />
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
