var firebase = require('firebase');
var cloudinary = require('cloudinary');
const functions = require('firebase-functions');
const admin = require('firebase-admin');


const config = require('./Config/Config');

admin.initializeApp();
firebase.initializeApp(config.firebaseConfig)
cloudinary.config(config.CLOUDINARY_CONFIG);



exports.photoSentinelle = functions.database.ref('/{zooName}/{dataType}/{itemId}/')
    .onWrite((change, context) => {

        // Initialisation de l'object photo
        let photoObject = {}

        // Recupération des anciennes et nouvelles données (comparaison à faire)
        const newValue = change.after.val();
        const previousValue = change.before.val();

        // Création de la reference de base
        let reference = '/' + context.params.zooName + '/' + context.params.dataType + '/' + context.params.itemId

        console.log(newValue.specieProfilePicture.fullPhoto)

        if (newValue.specieProfilePicture.edited === false) {

            console.log('i m in')

            cloudinary.v2.uploader.upload(newValue.specieProfilePicture.fullPhoto,
                {
                    eager: [
                        {
                            width: 400, height: 400,
                            crop: "pad"
                        },
                        {
                            width: 150, height: 150,
                            crop: "crop"
                        }]
                },
                function (error, result) {

                    specieProfilePicture = {
                        photoType: 'specieProfilePicture',
                        edited: true,
                        fullPhoto: newValue.specieProfilePicture.fullPhoto,
                        largeThumb: result.eager[0].url,
                        smallThumb: result.eager[1].url
                    }

                    console.log(photoObject)

                    let photoReference = reference + '/'

                    console.log(photoReference)

                    firebase.database().ref(photoReference).update({
                        specieProfilePicture
                    })
                        .catch(function (error) {
                            console.error("Error writing document: ", error);
                        }).then(function () {
                            console.log('document édité avec success')
                        })
                });
        }
    });

