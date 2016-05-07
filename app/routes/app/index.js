import Ember from 'ember';

export default Ember.Route.extend({
  flashMessages: Ember.inject.service(),

  actions: {
    createRoom(){
      let data = this.get('currentModel.newRoom');
      let room = this.store.createRecord('room', { name: data.name });

      this.set('currentModel.newRoom.errors', []);

      room.save()
          .then(() => {
            this.get('flashMessages').success(`Created room: ${data.name}`);
            this.set('currentModel.newRoom.name', '');
          }).catch((error) => {
            this.store.unloadRecord(room);
            this.set('currentModel.newRoom.errors', (error.errors || []).mapBy('detail'));
            this.get('flashMessages').danger(`Problem creating room: ${data.name}`);
          });
    },

    removeRoom() {
      if ( window.confirm('Are you sure?') ) {
        room.destroyRecord()
            .then(() => {
                this.get('flashMessages').success(`Deleted room: ${room.get('name')}`);
            }).catch(() => {
                this.get('flashMessages').danger(`Problem deleting room: ${room.get('name')}`);
            });
      }
    }
  },

  model() {
    return Ember.RSVP.hash({
      rooms: this.store.findAll('room'),
      newRoom: {
        name: '',
        erros: []
      }
    });
  }
});
