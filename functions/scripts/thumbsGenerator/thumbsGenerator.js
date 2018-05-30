var firebase = require('firebase');
var cloudinary = require('cloudinary');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const config = require('../../Config/Config');


cloudinary.config(config.CLOUDINARY_CONFIG);


exports.generateSpecieThumbs = function (newValue, previousValue, reference) {

    let photoReference = reference + '/'

    if (newValue.specieProfilePicture.edited === false) {

        console.log(newValue.specieProfilePicture)
        console.log(newValue.specieProfilePicture.fullPhoto)

        let newPhoto = newValue.specieProfilePicture.fullPhoto
        let specieProfilePicture

        cloudinary.v2.uploader.upload(newPhoto,
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
                    fullPhoto: newPhoto,
                    largeThumb: result.eager[0].url,
                    smallThumb: result.eager[1].url
                }

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

    if (newValue.speciePhotos.length > 1) {

        let newPhotosList = newValue.speciePhotos.slice(1)

        let speciePhotos = []

        for (let photo in newPhotosList) {

            if (newPhotosList[photo].edited === false) {

                let speciePhoto = newPhotosList[photo].fullPhoto

                cloudinary.v2.uploader.upload(speciePhoto,
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

                        speciePhoto = {
                            photoType: 'speciePhoto',
                            edited: true,
                            fullPhoto: speciePhoto,
                            largeThumb: result.eager[0].url,
                            smallThumb: result.eager[1].url
                        }

                        speciePhotos.push(speciePhoto)
                        console.log(speciePhotos)

                        firebase.database().ref(photoReference).update({
                            speciePhotos
                        })
                            .catch(function (error) {
                                console.error("Error writing document: ", error);
                            }).then(function () {
                                console.log('document édité avec success')
                            })
                    });
            }
        }
    }
};