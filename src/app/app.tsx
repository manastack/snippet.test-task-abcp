import { FC } from 'react'
import { Global } from '@emotion/react'

import { apiConfig, env } from '@app/config'
import { User } from '@modules/user'
import { ApiProvider } from '@shared/lib/api'

import './styles/tailwind.css'
import { AppStyle } from './styles/app.style'
import { GlobalStyles } from './styles/global.style'

const App: FC = () => (
  <>
    <ApiProvider
      config={apiConfig}
      queryDevtoolsEnabled={env.VITE_REACT_QUERY_DEVTOOLS_ENABLED as boolean}
    >
      <Global styles={GlobalStyles} />
      <AppStyle>
        <User />
      </AppStyle>
    </ApiProvider>
    <span className="hidden">{env.VITE_TIMESTAMP}</span>
  </>
)

export default App
