import React, { ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'

import ErrorBoundary from '../components/ErrorBoundary'
import Header from '../layouts/Header'
import HomePage from './Home'

function AppWrapper({ children }: { children: ReactNode }) {
  return <div className="flex flex-col justify-between w-screen min-h-screen">{children}</div>
}

function App() {
  return (
    <ErrorBoundary>
      <AppWrapper>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="description" content="Demo" />
          <title>Demo</title>
        </Helmet>
        <Header />
        <div className="mb-auto">
          <HomePage />
        </div>
      </AppWrapper>
    </ErrorBoundary>
  )
}

export default App
