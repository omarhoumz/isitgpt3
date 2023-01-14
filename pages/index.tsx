import type { NextPage } from 'next'

import Head from 'src/component/head'
import Header from 'src/ui/header'

const Home: NextPage = () => {
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
              className='w-full flex-grow resize-none rounded-lg border border-slate-200 px-6 py-4 font-light transition-colors focus:border-slate-400 focus:shadow-md focus:shadow-blue-50 focus:outline-none'
              placeholder='Paste your text here'
              id='content'
            />

            <button className='block self-center rounded-full bg-black py-2 px-6 text-lg font-semibold text-white'>
              Analyze text
            </button>
          </div>

          <div className='w-full p-10 text-center text-slate-200'>
            <h3 className='font-bold'>Results</h3>

            <div className='text-8xl font-bold'>%</div>

            <div className='tracking-widest'>Detection score</div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
