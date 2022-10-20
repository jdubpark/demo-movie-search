import React from 'react'

import Container from '../../components/Container'
import HeaderNav from '../../components/Header'
// import useCurrentPath from '../../hooks/useCurrentPath'

export default function Header() {
  // const currentPath = useCurrentPath()
  return (
    <div className="navbar pt-3">
      <Container>
        <HeaderNav.Left>
          <a href="/" className="inline-block py-1 px-2">
            <div className="inline-block text-2xl text-gray-800 whitespace-nowrap tracking-tight align-middle">
              <span className="text-yellow-500 font-bold">Demo Movie Directory</span>
            </div>
          </a>
        </HeaderNav.Left>
      </Container>
    </div>
  )
}
