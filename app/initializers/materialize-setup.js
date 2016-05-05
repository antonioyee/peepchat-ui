export function initialize() {
  if ( window && window.validate_field ) {
    window.validate_field = function () {};
  }
}

export default {
  name: 'materialize-setup',
  initialize
};
