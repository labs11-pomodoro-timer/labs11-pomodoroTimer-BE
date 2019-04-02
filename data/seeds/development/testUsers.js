exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('testing').del()
    .then(function () {
      // Inserts seed entries
      return knex('testing').insert([
        { "id":1, "firstname":"Heidie", "lastname":"O Mullen", "email":"homullen0@last.fm", "phone":"687 327 5029", "focusStart":null, "focusEnd":null},
        { "id": 2, "firstname": "Gertrude", "lastname": "Sambals", "email": "gsambals1@merriam-webster.com", "phone": "599 896 6685", "focusStart": null, "focusEnd": null},
        { "id": 3, "firstname": "Koren", "lastname": "Erie", "email": "kerie2@desdev.cn", "phone": "473 897 2392", "focusStart": null, "focusEnd": null},
        { "id": 4, "firstname": "Dasie", "lastname": "Bleaden", "email": "dbleaden3@cnn.com", "phone": "306 325 3539", "focusStart": null, "focusEnd": null},
        { "id": 5, "firstname": "Barthel", "lastname": "Oris", "email": "boris4@hibu.com", "phone": "943 331 0733", "focusStart": null, "focusEnd": null},
      ]);
    });
};