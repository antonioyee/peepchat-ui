import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['material-toast', 'toast'],
  classNameBindings: ['active', 'exiting', 'color'],
  active: false,
  color: Ember.computed('content.type', function () {
    switch ( this.get('content.type') ) {
      case 'danger':
        return 'red darken-2 white-text';
      case 'warning':
        return 'yellow lighten-1 black-text';
      default: return '';
    }
  }),

  exiting: Ember.computed.readOnly('content.exiting'),

  _destroyFlashMessage(){
    const flash = Ember.getWithDefault(this, 'content', false);
    if ( flash ) {
      flash.destroyMessage();
    }
  },

  didInsertElement() {
    this._super(...arguments);
    this._applyActiveClass = Ember.run.next(() => {
      this.set('active', true);
    });
  },

  willDestroyElement() {
    this._super();
    this._destroyFlashMessage();

    if ( this._applyActiveClass ) {
      Ember.run.cancel(this._applyActiveClass);
    }
  }
});
