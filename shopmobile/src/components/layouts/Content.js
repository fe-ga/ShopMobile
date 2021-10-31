import { CContainer, CSpinner } from '@coreui/react'
import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import routes from '../../router'

function Content() {
    return (
        <CContainer fluid className='content'>
        <Suspense fallback={<CSpinner color="primary" />}>
           <Switch>
             {routes.map((route, idx) => {
               return (
                 route.component && (
                   <Route
                     key={idx}
                     path={route.path}
                     exact={route.exact}
                     name={route.name}
                     render={(props) => (
                       <CContainer>
                         <route.component {...props} />
                       </CContainer>
                     )}
                   />
                 )
               );
             })}
           </Switch>
         </Suspense>
           </CContainer>
    )
}

export default Content
