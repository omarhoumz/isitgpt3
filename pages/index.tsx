import { useMutation } from '@tanstack/react-query'
import type { NextPage } from 'next'
import { useState } from 'react'
import { motion } from 'framer-motion'

import Head from 'src/component/head'
import Header from 'src/ui/header'

async function getTextScore(text: string) {
  const body = new FormData()
  body.append('text', text)

  const url =
    'https://ischatgpt.competent-montalcini.152-70-141-103.plesk.page/isitgpt3'

  const options = { method: 'POST', body }

  return fetch(url, options).then((res) => res.json())
}

const Home: NextPage = () => {
  const [text, setText] = useState('')
  const [result, setResult] = useState<null | { score: string }>(null)

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: (text: string) => getTextScore(text),
    onSettled(data) {
      setResult(data)
    },
  })

  function analyzeText() {
    mutate(text)
    setResult(null)
  }

  return (
    <>
      <Head />

      <Header />

      <main
        className='grid h-[max(85vh,600px)] gap-x-12 px-12 py-6'
        style={{ gridTemplateColumns: '300px 1fr' }}
      >
        <div>
          <h2 className='mb-3 text-4xl'>AI Content Detector</h2>
          <p className='leading-relaxed text-slate-600'>
            Some search engines penalize your page ranking if they detect
            content that reads like it was entirely produced by AI. Evaluate
            your text with this detector and decide if you want to make
            adjustments before you publish your content.
          </p>
        </div>

        <div
          className='grid h-full w-full rounded-2xl border border-slate-200 shadow-md shadow-slate-100'
          style={{ gridTemplateColumns: '1fr 300px' }}
        >
          <div className='flex flex-grow flex-col gap-4 border-r p-10'>
            <label
              htmlFor='content'
              className='cursor-pointer self-start text-lg font-bold'
            >
              Add some text
            </label>
            <textarea
              className='w-full flex-grow resize-none rounded-lg border border-slate-200 px-6 py-4 font-light leading-7 transition-colors focus:border-slate-400 focus:shadow-md focus:shadow-blue-50 focus:outline-none'
              placeholder='Paste your text here'
              id='content'
              onChange={(e) => setText(e.target.value)}
            />

            <button
              onClick={analyzeText}
              disabled={isLoading}
              className='block self-center rounded-full bg-black py-2 px-6 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-600'
            >
              {isLoading ? 'Analyzing...' : 'Analyze text'}
            </button>
          </div>

          <div
            className={`w-full p-10 text-center ${
              isSuccess && result ? 'text-slate-800' : 'text-slate-200'
            }`}
          >
            <h3 className='font-bold'>Results</h3>

            {isSuccess && result ? (
              <>
                <div className='text-7xl font-bold'>{result.score}%</div>
                <div className='my-2 h-9 w-full rounded-full bg-slate-100'>
                  <motion.div
                    className='h-full rounded-full bg-green-400'
                    initial={{ width: '0%' }}
                    transition={{ duration: 0.5 }}
                    animate={{ width: `${result.score}%` }}
                  />
                </div>
              </>
            ) : (
              <>
                <div className='text-7xl font-bold'>%</div>
                <div className='my-2 h-9 w-full rounded-full bg-slate-100' />
              </>
            )}

            <div className='tracking-widest'>Detection score</div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
