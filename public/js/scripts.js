let PouchDb = require('pouchdb');

let db = new PouchDb('my_db');

submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault();

    let select = document.getElementById("character-select");
    const name = document.querySelector('#character-name');
    const bio = document.querySelector('#bio');
    const newClass = document.querySelector('#classes');
    const dbClass = newClass.value;
    const dbName = name.value;
    const dbBio = bio.value;
    name.value = "";
    bio.value = "";
    newClass.value = "";
    select.value = "";

    if (dbClass === "") {
        window.alert('Please pick a class');
        return false;
    } else if (dbName === "") {
        window.alert('Please enter a name');
        return false;
    } else if (dbBio === "") {
        window.alert('Please enter a bio');
        return false;
    }

    const new_character = {
        "_id": dbName,
        "bio": dbBio,
        "class": dbClass,
    };

    db.put(new_character).catch(function (err) {
        window.alert("There is already a character with that name");
    });

    for (let i=1; i<select.length; i++) {
            select.options[i] = null;
    }

    db.allDocs().then(function (result){
        let entries = result.rows;
        for(let entry of entries) {
            select.options[select.options.length] = new Option(entry.id, entry.id);
        }
    });

    window.alert('Successfully saved character');

    checkClass(newClass.value);

    return false
};

selectClass = function(e) {
    e.preventDefault();

    const newClass = document.querySelector('#classes');
    switch(newClass.value) {
        case 'Mage':
            document.querySelector('#strength').innerHTML = 'Strength: 2';
            document.querySelector('#agility').innerHTML = 'Agility: 2';
            document.querySelector('#magic').innerHTML = 'Magic: 8';
            document.querySelector('#intelligence').innerHTML = 'Intelligence: 6';
            break;
        case 'Warrior':
            document.querySelector('#strength').innerHTML = 'Strength: 7';
            document.querySelector('#agility').innerHTML = 'Agility: 4';
            document.querySelector('#magic').innerHTML = 'Magic: 2';
            document.querySelector('#intelligence').innerHTML = 'Intelligence: 3';
            break;
        case 'Wizard':
            document.querySelector('#strength').innerHTML = 'Strength: 4';
            document.querySelector('#agility').innerHTML = 'Agility: 3';
            document.querySelector('#magic').innerHTML = 'Magic: 6';
            document.querySelector('#intelligence').innerHTML = 'Intelligence: 9';
            break;
        case 'Assassin':
            document.querySelector('#strength').innerHTML = 'Strength: 5';
            document.querySelector('#agility').innerHTML = 'Agility: 8';
            document.querySelector('#magic').innerHTML = 'Magic: 4';
            document.querySelector('#intelligence').innerHTML = 'Intelligence: 3';
            break;
        default:
            document.querySelector('#strength').innerHTML = 'Strength: ';
            document.querySelector('#agility').innerHTML = 'Agility: ';
            document.querySelector('#magic').innerHTML = 'Magic: ';
            document.querySelector('#intelligence').innerHTML = 'Intelligence: ';
            break;
    }

};

selectCharacter = function(e) {
  e.preventDefault();

  const character = document.querySelector('#character-select');
  let newClass = "";
  if (character.value !== "") {
      db.get(character.value).catch(function (err){
          console.log(err);
      }).then(function (result) {
          document.querySelector('#character-name').value = result._id;
          document.querySelector('#bio').value = result.bio;
          document.querySelector('#classes').value = result.class;
          console.log(result.class);
          newClass = result.class;
          checkClass(newClass);
      });
  } else {
      document.querySelector('#character-name').value = "";
      document.querySelector('#bio').value = "";
      document.querySelector('#classes').value = "";
      checkClass(newClass);
  }

  let title = document.querySelector('#title').value;
};

checkClass = function(newClass) {
    switch(newClass) {
        case 'Mage':
            document.querySelector('#strength').innerHTML = 'Strength: 2';
            document.querySelector('#agility').innerHTML = 'Agility: 2';
            document.querySelector('#magic').innerHTML = 'Magic: 8';
            document.querySelector('#intelligence').innerHTML = 'Intelligence: 6';
            break;
        case 'Warrior':
            document.querySelector('#strength').innerHTML = 'Strength: 7';
            document.querySelector('#agility').innerHTML = 'Agility: 4';
            document.querySelector('#magic').innerHTML = 'Magic: 2';
            document.querySelector('#intelligence').innerHTML = 'Intelligence: 3';
            break;
        case 'Wizard':
            document.querySelector('#strength').innerHTML = 'Strength: 4';
            document.querySelector('#agility').innerHTML = 'Agility: 3';
            document.querySelector('#magic').innerHTML = 'Magic: 6';
            document.querySelector('#intelligence').innerHTML = 'Intelligence: 9';
            break;
        case 'Assassin':
            document.querySelector('#strength').innerHTML = 'Strength: 5';
            document.querySelector('#agility').innerHTML = 'Agility: 8';
            document.querySelector('#magic').innerHTML = 'Magic: 4';
            document.querySelector('#intelligence').innerHTML = 'Intelligence: 3';
            break;
        default:
            document.querySelector('#strength').innerHTML = 'Strength: ';
            document.querySelector('#agility').innerHTML = 'Agility: ';
            document.querySelector('#magic').innerHTML = 'Magic: ';
            document.querySelector('#intelligence').innerHTML = 'Intelligence: ';
            break;
    }
};

deleteDB = function(e) {
    e.preventDefault();
    let select = document.getElementById("character-select");
    let name = document.getElementById("character-name");
    let bio = document.getElementById("bio");
    let classes = document.getElementById("classes");
    name.value = "";
    bio.value = "";
    classes.value = "";
    select.value = "";

    document.querySelector('#strength').innerHTML = 'Strength: ';
    document.querySelector('#agility').innerHTML = 'Agility: ';
    document.querySelector('#magic').innerHTML = 'Magic: ';
    document.querySelector('#intelligence').innerHTML = 'Intelligence: ';

    db.allDocs().then(function (result) {
        return Promise.all(result.rows.map(function (row) {
            return db.remove(row.id, row.value.rev);
        }));
    }).then(function () {
        window.alert('Successfully deleted all characters');
    }).catch(function (err) {
        window.alert('Could not delete all characters');
    });
    for (let i=1; i<=select.length; i++) {
        select.options[i] = null;
    }


};

window.onload = function () {
    const characters = document.querySelector('#character-select');
    db.allDocs().then(function (result){
        let entries = result.rows;
        for(let entry of entries) {
            var select = document.getElementById("character-select");
            select.options[select.options.length] = new Option(entry.id, entry.id);
        }
    });
    const submitButton = document.querySelector('#submit');
    const classes = document.querySelector('#classes');
    const character = document.querySelector('#character-select');
    const deleteAll = document.querySelector('#deleteAll');
    submitButton.onclick = submit;
    classes.onchange = selectClass;
    character.onchange = selectCharacter;
    deleteAll.onclick = deleteDB;

};
