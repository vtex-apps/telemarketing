import PropTypes from 'prop-types'

export const sessionPropTypes = PropTypes.shape({
  loading: PropTypes.bool.isRequired,
  getSession: PropTypes.shape({
    adminUserEmail: PropTypes.string,
    adminUserId: PropTypes.string,
    impersonable: PropTypes.bool.isRequired,
    profile: PropTypes.shape({
      document: PropTypes.string,
      phone: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
    impersonate: PropTypes.shape({
      storeUserId: PropTypes.string,
      storeUserEmail: PropTypes.string,
    }),
  }),
})

export const clientPropTypes = PropTypes.shape({
  document: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
})
