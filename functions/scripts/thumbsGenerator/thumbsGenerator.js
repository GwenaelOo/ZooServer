var firebase = require('firebase');
var cloudinary = require('cloudinary');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const config = require('../../Config/Config');

// Penser à ajouter la gestion du new / previous pour éviter une mise à jour de photo sur un changement de texte

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

exports.generateEventThumbs = function (newValue, previousValue, reference) {

    let photoReference = reference + '/'

    if (newValue.eventProfilePicture.edited === false) {

        console.log(newValue.eventProfilePicture)
        console.log(newValue.eventProfilePicture.fullPhoto)

        let newPhoto = newValue.eventProfilePicture.fullPhoto
        let eventProfilePicture

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

                eventProfilePicture = {
                    photoType: 'eventProfilePicture',
                    edited: true,
                    fullPhoto: newPhoto,
                    largeThumb: result.eager[0].url,
                    smallThumb: result.eager[1].url
                }

                firebase.database().ref(photoReference).update({
                    eventProfilePicture
                })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    }).then(function () {
                        console.log('document édité avec success')
                    })
            });
    }

    if (newValue.eventPhotos.length > 1) {

        let newPhotosList = newValue.eventPhotos.slice(1)

        let eventPhotos = []

        for (let photo in newPhotosList) {

            if (newPhotosList[photo].edited === false) {

                let eventPhoto = newPhotosList[photo].fullPhoto

                cloudinary.v2.uploader.upload(eventPhoto,
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

                        eventPhoto = {
                            photoType: 'eventPhoto',
                            edited: true,
                            fullPhoto: eventPhoto,
                            largeThumb: result.eager[0].url,
                            smallThumb: result.eager[1].url
                        }

                        eventPhotos.push(eventPhoto)
                        console.log(eventPhotos)

                        firebase.database().ref(photoReference).update({
                            eventPhotos
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

exports.generateServiceThumbs = function (newValue, previousValue, reference) {

    let photoReference = reference + '/'

    if (newValue.serviceProfilePicture.edited === false) {

        let newPhoto = newValue.serviceProfilePicture.fullPhoto
        let serviceProfilePicture

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

                serviceProfilePicture = {
                    photoType: 'serviceProfilePicture',
                    edited: true,
                    fullPhoto: newPhoto,
                    largeThumb: result.eager[0].url,
                    smallThumb: result.eager[1].url
                }

                firebase.database().ref(photoReference).update({
                    serviceProfilePicture
                })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    }).then(function () {
                        console.log('document édité avec success')
                    })
            });
    }

    if (newValue.servicePhotos.length > 1) {

        let newPhotosList = newValue.servicePhotos.slice(1)

        let servicePhotos = []

        for (let photo in newPhotosList) {

            if (newPhotosList[photo].edited === false) {

                let servicePhoto = newPhotosList[photo].fullPhoto

                cloudinary.v2.uploader.upload(servicePhoto,
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

                        servicePhoto = {
                            photoType: 'servicePhoto',
                            edited: true,
                            fullPhoto: servicePhoto,
                            largeThumb: result.eager[0].url,
                            smallThumb: result.eager[1].url
                        }

                        servicePhotos.push(servicePhoto)
                        console.log(servicePhotos)

                        firebase.database().ref(photoReference).update({
                            servicePhotos
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

exports.generateAnimationThumbs = function (newValue, previousValue, reference) {

    let photoReference = reference + '/'

    if (newValue.animationProfilePicture.edited === false) {

        let newPhoto = newValue.animationProfilePicture.fullPhoto
        let animationProfilePicture

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

                animationProfilePicture = {
                    photoType: 'animationProfilePicture',
                    edited: true,
                    fullPhoto: newPhoto,
                    largeThumb: result.eager[0].url,
                    smallThumb: result.eager[1].url
                }

                firebase.database().ref(photoReference).update({
                    animationProfilePicture
                })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    }).then(function () {
                        console.log('document édité avec success')
                    })
            });
    }

    if (newValue.animationPhotos.length > 1) {

        let newPhotosList = newValue.animationPhotos.slice(1)

        let animationPhotos = []

        for (let photo in newPhotosList) {

            if (newPhotosList[photo].edited === false) {

                let animationPhoto = newPhotosList[photo].fullPhoto

                cloudinary.v2.uploader.upload(animationPhoto,
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

                        animationPhoto = {
                            photoType: 'animationPhoto',
                            edited: true,
                            fullPhoto: animationPhoto,
                            largeThumb: result.eager[0].url,
                            smallThumb: result.eager[1].url
                        }

                        animationPhotos.push(animationPhoto)
                        console.log(animationPhotos)

                        firebase.database().ref(photoReference).update({
                            animationPhotos
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

exports.generateAnimalThumbs = function (newValue, previousValue, reference) {

    let photoReference = reference + '/'

    if (newValue.animalProfilePicture.edited === false) {

        let newPhoto = newValue.animalProfilePicture.fullPhoto
        let animalProfilePicture

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

                animalProfilePicture = {
                    photoType: 'animalProfilePicture',
                    edited: true,
                    fullPhoto: newPhoto,
                    largeThumb: result.eager[0].url,
                    smallThumb: result.eager[1].url
                }

                firebase.database().ref(photoReference).update({
                    animalProfilePicture
                })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    }).then(function () {
                        console.log('document édité avec success')
                    })
            });
    }

    if (newValue.animalPhotos.length > 1) {

        let newPhotosList = newValue.animalPhotos.slice(1)

        let animalPhotos = []

        for (let photo in newPhotosList) {

            if (newPhotosList[photo].edited === false) {

                let animalPhoto = newPhotosList[photo].fullPhoto

                cloudinary.v2.uploader.upload(animalPhoto,
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

                        animalPhoto = {
                            photoType: 'animalPhoto',
                            edited: true,
                            fullPhoto: animalPhoto,
                            largeThumb: result.eager[0].url,
                            smallThumb: result.eager[1].url
                        }

                        animalPhotos.push(animalPhoto)
                        console.log(animalPhotos)

                        firebase.database().ref(photoReference).update({
                            animalPhotos
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
