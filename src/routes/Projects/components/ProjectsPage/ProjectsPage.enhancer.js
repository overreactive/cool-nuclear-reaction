import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { UserIsAuthenticated } from 'utils/router'


export default compose(
    // Add props.match
    withRouter,
    // Redirect to /login if user is not logged in
    UserIsAuthenticated
);  
