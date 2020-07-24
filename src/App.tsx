import React from 'react';

import GlobalStyle from './styles/global'
import SignIn from './pages/SignIn'
import SignUp from './pages/Signup'

const App: React.FC = () => (
  <>
    {/* <SignUp /> */}
    <SignIn />
    <GlobalStyle />
  </>
)

export default App;
