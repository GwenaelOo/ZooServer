var firebase = require('firebase');
var cloudinary = require('cloudinary');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const config = require('./Config/Config');
var thumbs = require('./scripts/thumbsGenerator/thumbsGenerator')
admin.initializeApp();
firebase.initializeApp(config.firebaseConfig)
cloudinary.config(config.CLOUDINARY_CONFIG);



exports.thumbsGenerator = functions.database.ref('/{zooName}/{dataType}/{itemId}/')
    .onWrite((change, context) => {

        // Création de la reference de base
        let reference = '/' + context.params.zooName + '/' + context.params.dataType + '/' + context.params.itemId

        switch (context.params.dataType) {
            case 'speciesData':
                thumbs.generateSpecieThumbs(change.after.val(), change.before.val(), reference)
                break;
            case 'eventsData':
                thumbs.generateEventThumbs(change.after.val(), change.before.val(), reference)
                break;
            case 'animationsData':
                thumbs.generateAnimationThumbs(change.after.val(), change.before.val(), reference)
                break;
            case 'servicesData':
                thumbs.generateServiceThumbs(change.after.val(), change.before.val(), reference)
                break;
            default:
                break;
        }
    });

exports.animalthumbsGenerator = functions.database.ref('/{zooName}/speciesData/{itemId}/{subItemId}')
    .onWrite((change, context) => {

        // Création de la reference de base
        let reference = '/' + context.params.zooName + '/' + context.params.dataType + '/' + context.params.itemId + '/' + context.params.subItemId

        thumbs.generateAnimalThumbs(change.after.val(), change.before.val(), reference)

    });
