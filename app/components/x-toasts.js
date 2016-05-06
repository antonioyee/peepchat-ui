import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['toasts'],
  flashMessages: Ember.inject.service(),
  reversedFlashQueue: Ember.computed('flashMessages.arrangeQueue.[]', function () {
    return this.get('flashMessages.arrangeQueue').reverse();
  })
});
