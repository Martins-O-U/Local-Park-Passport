
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('facility').del()
    .then(function () {
      // Inserts seed entries
      return knex('facility').insert([
        {id: 1, facility_name: 'dog park', description: "A dos walk area"},
        {id: 2, facility_name: 'wildlife', description: "come see widelife at closer range"},
        {id: 3, facility_name: 'hiking trails', description: "let's climb the hills"},
        {id: 4, facility_name: 'disc golf', description: "a wide golfspace all green"},
        {id: 5, facility_name: 'open space', description: "have other ideas but needspace? we've got your back"},
        {id: 6, facility_name: 'tree climbing', description: "explore height through three climbing"},
        {id: 7, facility_name: 'waterfalls', description: "watch natyre doit s thing"},
        {id: 8, facility_name: 'kids play area', description: "safe for kids"},
        {id: 9, facility_name: 'horse riding', description: "let do some galloping"}
      ]);
    });
};